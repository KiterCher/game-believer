import * as fs from 'fs';
import * as path from 'path';
import type { QAResult, QAIssue, ContentType } from '../scripts/types';

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content');
const RULES_FILE = path.join(__dirname, 'rules.json');

function loadRules(): any {
  const content = fs.readFileSync(RULES_FILE, 'utf-8');
  return JSON.parse(content);
}

function countWords(text: string): number {
  // Simple word count - split by whitespace and count non-empty strings
  // This is more reliable than trying to parse markdown
  const words = text.split(/\s+/).filter(w => w.length > 0 && !w.match(/^[#*`\->|]+$/));
  return words.length;
}

function hasH1(content: string): boolean {
  const h1Regex = /^#\s+.+$/m;
  return h1Regex.test(content);
}

function countH2s(content: string): number {
  const h2Regex = /^##\s+.+$/gm;
  return (content.match(h2Regex) || []).length;
}

function countFAQs(content: string): number {
  // Count questions in FAQ section (supports ## FAQ, ## H2: FAQ, **H2: FAQ**, ## Frequently Asked Questions, etc.)
  const faqMatch = content.match(/(?:##\s*(?:H2:\s*)?(?:FAQ|Frequently Asked Questions)|\*\*H2:\s*FAQ\*\*)[\s\S]*/i);
  if (!faqMatch) return 0;

  const faqSection = faqMatch[0];
  // Count lines that contain question marks (more flexible matching)
  const lines = faqSection.split('\n');
  let count = 0;
  for (const line of lines) {
    const trimmed = line.trim();
    // Match lines that look like questions (contain ? and are in FAQ section)
    // Support formats: ### Q: ..., ### 1. ..., **1. Question?**, - Q: ..., * Q: ...
    if (trimmed.includes('?') && !trimmed.startsWith('A:') && !trimmed.startsWith('**A:')) {
      // Check if it's a question line
      if (
        trimmed.match(/^#{2,3}\s/) ||           // ### Q: ... or ## FAQ
        trimmed.match(/^\d+\.\s/) ||            // 1. Question?
        trimmed.match(/^\*\*\d+\.\s/) ||        // **1. Question?**
        trimmed.match(/^\*\*Q\d*[:.]\s*/) ||    // **Q1:** or **Q:**
        trimmed.includes('Q:') ||
        trimmed.includes('Q :')
      ) {
        count++;
      }
    }
  }
  return count;
}

function extractMetaDescription(content: string): string | null {
  const frontmatterMatch = content.match(/^---[\s\S]*?description:\s*"([^"]+)"[\s\S]*?---/);
  if (frontmatterMatch) return frontmatterMatch[1];

  // Try to find first paragraph after H1
  const h1Match = content.match(/^#[^\n]+\n+([^\n#]+)/m);
  if (h1Match) return h1Match[1].trim();

  return null;
}

function countInternalLinks(content: string): number {
  const linkRegex = /\[([^\]]+)\]\(\/[^)]+\)/g;
  return (content.match(linkRegex) || []).length;
}

function checkKeywordCoverage(content: string, mainKeyword: string, secondaryKeywords: string[]): { mainCount: number; secondaryCoverage: number } {
  const lowerContent = content.toLowerCase();
  const mainCount = (lowerContent.match(new RegExp(mainKeyword.toLowerCase(), 'g')) || []).length;

  const coveredSecondary = secondaryKeywords.filter(kw =>
    lowerContent.includes(kw.toLowerCase())
  );
  const secondaryCoverage = secondaryKeywords.length > 0
    ? (coveredSecondary.length / secondaryKeywords.length) * 100
    : 100;

  return { mainCount, secondaryCoverage };
}

export async function runQA(filePath: string): Promise<QAResult> {
  const content = fs.readFileSync(filePath, 'utf-8');
  const rules = loadRules().rules;
  const issues: QAIssue[] = [];

  // Detect content type from path
  let contentType: ContentType = 'character';
  if (filePath.includes('/builds/')) contentType = 'build';
  else if (filePath.includes('/teams/')) contentType = 'team';
  else if (filePath.includes('/pull-advice/')) contentType = 'pull-advice';

  // 1. Check H1
  if (rules.h1_exists.enabled && !hasH1(content)) {
    issues.push({
      rule: 'h1_exists',
      severity: rules.h1_exists.severity as 'error' | 'warning',
      message: 'Missing H1 heading',
    });
  }

  // 2. Check FAQ count
  if (rules.faq_count.enabled) {
    const faqCount = countFAQs(content);
    if (faqCount < rules.faq_count.min) {
      issues.push({
        rule: 'faq_count',
        severity: rules.faq_count.severity as 'error' | 'warning',
        message: `FAQ count (${faqCount}) is below minimum (${rules.faq_count.min})`,
      });
    }
  }

  // 3. Check meta description
  if (rules.meta_description.enabled) {
    const metaDesc = extractMetaDescription(content);
    if (!metaDesc) {
      issues.push({
        rule: 'meta_description',
        severity: rules.meta_description.severity as 'error' | 'warning',
        message: 'Missing meta description in frontmatter',
      });
    } else if (metaDesc.length < rules.meta_description.min_chars || metaDesc.length > rules.meta_description.max_chars) {
      issues.push({
        rule: 'meta_description',
        severity: rules.meta_description.severity as 'error' | 'warning',
        message: `Meta description length (${metaDesc.length}) should be ${rules.meta_description.min_chars}-${rules.meta_description.max_chars} characters`,
      });
    }
  }

  // 4. Check word count
  if (rules.word_count.enabled) {
    const wordCount = countWords(content);
    const minWords = rules.word_count.min[contentType] || 800;
    if (wordCount < minWords) {
      issues.push({
        rule: 'word_count',
        severity: rules.word_count.severity as 'error' | 'warning',
        message: `Word count (${wordCount}) is below minimum (${minWords}) for ${contentType}`,
      });
    }
  }

  // 5. Check internal links
  if (rules.internal_links.enabled) {
    const linkCount = countInternalLinks(content);
    if (linkCount < rules.internal_links.min) {
      issues.push({
        rule: 'internal_links',
        severity: rules.internal_links.severity as 'error' | 'warning',
        message: `Internal links (${linkCount}) is below minimum (${rules.internal_links.min})`,
      });
    }
  }

  // 6. Check H2 structure
  if (rules.h2_structure.enabled) {
    const h2Count = countH2s(content);
    if (h2Count < rules.h2_structure.min) {
      issues.push({
        rule: 'h2_structure',
        severity: rules.h2_structure.severity as 'error' | 'warning',
        message: `H2 headings (${h2Count}) is below minimum (${rules.h2_structure.min})`,
      });
    }
  }

  const errors = issues.filter(i => i.severity === 'error');
  const warnings = issues.filter(i => i.severity === 'warning');

  return {
    passed: errors.length === 0,
    score: Math.max(0, 100 - errors.length * 20 - warnings.length * 5),
    errors,
    warnings,
    fixes: issues.map(i => `[${i.rule}] ${i.message}`),
  };
}

export async function runQAAll(): Promise<Record<string, QAResult>> {
  const results: Record<string, QAResult> = {};

  const contentDirs = ['characters', 'builds', 'teams', 'pull-advice'];

  for (const dir of contentDirs) {
    const dirPath = path.join(CONTENT_DIR, dir);
    if (!fs.existsSync(dirPath)) continue;

    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md'));

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const key = `${dir}/${file}`;
      results[key] = await runQA(filePath);
    }
  }

  return results;
}

// CLI entry point
if (require.main === module) {
  const args = process.argv.slice(2);
  const fileArg = args.find(a => a.startsWith('--file='));
  const allFlag = args.includes('--all');
  const outputArg = args.find(a => a.startsWith('--output='));

  if (fileArg) {
    const filePath = fileArg.split('=')[1];
    runQA(filePath)
      .then(result => {
        console.log(`\nQA Result for ${filePath}:`);
        console.log(`  Passed: ${result.passed ? '✅' : '❌'}`);
        console.log(`  Score: ${result.score}/100`);
        if (result.errors.length > 0) {
          console.log(`  Errors:`);
          result.errors.forEach(e => console.log(`    - ${e.message}`));
        }
        if (result.warnings.length > 0) {
          console.log(`  Warnings:`);
          result.warnings.forEach(w => console.log(`    - ${w.message}`));
        }
      })
      .catch(err => {
        console.error('QA failed:', err);
        process.exit(1);
      });
  } else if (allFlag) {
    runQAAll()
      .then(results => {
        const entries = Object.entries(results);
        const passed = entries.filter(([_, r]) => r.passed).length;
        const failed = entries.filter(([_, r]) => !r.passed).length;

        console.log(`\nQA Report:`);
        console.log(`  Total: ${entries.length}`);
        console.log(`  Passed: ${passed} ✅`);
        console.log(`  Failed: ${failed} ❌`);

        if (failed > 0) {
          console.log(`\nFailed files:`);
          entries
            .filter(([_, r]) => !r.passed)
            .forEach(([key, result]) => {
              console.log(`\n  ${key}:`);
              result.errors.forEach(e => console.log(`    - ${e.message}`));
            });
        }

        if (outputArg) {
          const outputFile = outputArg.split('=')[1];
          fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));
          console.log(`\nReport saved to: ${outputFile}`);
        }
      })
      .catch(err => {
        console.error('QA failed:', err);
        process.exit(1);
      });
  } else {
    console.error('Usage:');
    console.error('  npx tsx src/qa/check.ts --file=src/content/characters/kafka.md');
    console.error('  npx tsx src/qa/check.ts --all --output=qa-report.json');
    process.exit(1);
  }
}
