import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { buildPrompt } from './build-prompt';
import { listCharacters } from './utils/read-json';
import type { ContentType } from './types';

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env') });

// AI API Configuration
const AI_CONFIG = {
  provider: process.env.AI_PROVIDER || 'deepseek', // 'deepseek' or 'openai'
  apiKey: process.env.AI_API_KEY || '',
  model: process.env.AI_MODEL || 'deepseek-chat',
  baseUrl: process.env.AI_BASE_URL || 'https://api.deepseek.com/v1',
  temperature: 0.7,
  maxTokens: 4096,
  maxRetries: 3,
  concurrency: 5,
};

const OUTPUT_DIR = path.join(process.cwd(), 'src', 'content');

interface GenerateOptions {
  slug: string;
  type: ContentType;
  force?: boolean;
}

async function callAI(prompt: string): Promise<string> {
  const response = await fetch(`${AI_CONFIG.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${AI_CONFIG.apiKey}`,
    },
    body: JSON.stringify({
      model: AI_CONFIG.model,
      messages: [
        {
          role: 'system',
          content: 'You are an expert content writer for a gaming website. Write high-quality, SEO-optimized content in English.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: AI_CONFIG.temperature,
      max_tokens: AI_CONFIG.maxTokens,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`AI API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

function normalizeMarkdown(content: string, slug: string, type: ContentType): string {
  let result = content;

  // 1. Ensure H1 exists
  if (!result.startsWith('# ')) {
    const h1Match = result.match(/^#\s+.+$/m);
    if (h1Match) {
      result = h1Match[0] + '\n\n' + result.replace(h1Match[0], '');
    }
  }

  // 2. Add frontmatter
  const frontmatter = generateFrontmatter(slug, type);
  result = frontmatter + '\n\n' + result;

  // 3. Normalize internal links
  result = result.replace(/\[([^\]]+)\]\(\/characters\//g, '[$1](/characters/');
  result = result.replace(/\[([^\]]+)\]\(\/builds\//g, '[$1](/builds/');
  result = result.replace(/\[([^\]]+)\]\(\/teams\//g, '[$1](/teams/');

  // 4. Clean up extra whitespace
  result = result.replace(/\n{3,}/g, '\n\n');

  return result;
}

function generateFrontmatter(slug: string, type: ContentType): string {
  const typeNames: Record<ContentType, string> = {
    'character': 'Character Guide',
    'build': 'Build Guide',
    'team': 'Team Guide',
    'pull-advice': 'Pull Guide',
    'faq': 'FAQ',
  };

  const descriptions: Record<ContentType, string> = {
    'character': `Complete ${slug} guide for Honkai Star Rail. Best builds, relics, light cones, team compositions, and gameplay tips. Updated for 2026.`,
    'build': `Ultimate ${slug} build guide for Honkai Star Rail. Best relics, light cones, stat priorities, and team synergies. Updated for 2026.`,
    'team': `Best ${slug} team compositions for Honkai Star Rail. Optimal team setups, rotation guides, and character synergies. Updated for 2026.`,
    'pull-advice': `Should you pull ${slug} in Honkai Star Rail? Complete pull guide with value analysis and team synergies. Updated for 2026.`,
    'faq': `Frequently asked questions about ${slug} in Honkai Star Rail. Get answers about builds, teams, and gameplay strategies.`,
  };

  return `---
title: "${slug.charAt(0).toUpperCase() + slug.slice(1)} ${typeNames[type]} | GameBeliever"
description: "${descriptions[type]}"
updatedAt: "${new Date().toISOString().split('T')[0]}"
type: "${type}"
character: "${slug}"
---`;
}

async function generateContent(slug: string, type: ContentType, retryCount = 0): Promise<string> {
  console.log(`\nGenerating ${slug}/${type}... (attempt ${retryCount + 1})`);

  // 1. Build prompt
  const prompt = buildPrompt(slug, type);

  // 2. Call AI
  let rawContent: string;
  try {
    rawContent = await callAI(prompt);
  } catch (error) {
    console.error(`AI call failed for ${slug}/${type}:`, error);
    if (retryCount < AI_CONFIG.maxRetries) {
      console.log(`Retrying... (${retryCount + 1}/${AI_CONFIG.maxRetries})`);
      return generateContent(slug, type, retryCount + 1);
    }
    throw error;
  }

  // 3. Normalize
  const normalized = normalizeMarkdown(rawContent, slug, type);

  // 4. Save
  const outputDir = path.join(OUTPUT_DIR, type === 'character' ? 'characters' : type === 'build' ? 'builds' : type === 'team' ? 'teams' : 'pull-advice');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputFile = path.join(outputDir, `${slug}.md`);
  fs.writeFileSync(outputFile, normalized, 'utf-8');
  console.log(`Content saved to: ${outputFile}`);

  return normalized;
}

async function generateAllTypes(slug: string): Promise<void> {
  const types: ContentType[] = ['character', 'build', 'team', 'pull-advice'];

  for (const type of types) {
    await generateContent(slug, type);
  }

  console.log(`\n✅ All content generated for ${slug}`);
}

async function generateBatch(slugs: string[], concurrency: number): Promise<void> {
  const queue = [...slugs];
  const running: Promise<void>[] = [];

  while (queue.length > 0 || running.length > 0) {
    while (running.length < concurrency && queue.length > 0) {
      const slug = queue.shift()!;
      const promise = generateAllTypes(slug).then(() => {
        running.splice(running.indexOf(promise), 1);
      });
      running.push(promise);
    }

    if (running.length > 0) {
      await Promise.race(running);
    }
  }
}

// CLI entry point
if (require.main === module) {
  const args = process.argv.slice(2);
  const charArg = args.find(a => a.startsWith('--char='));
  const typeArg = args.find(a => a.startsWith('--type='));
  const allChars = args.includes('--all-chars');
  const concurrencyArg = args.find(a => a.startsWith('--concurrency='));
  const force = args.includes('--force');

  if (!AI_CONFIG.apiKey) {
    console.error('Error: AI_API_KEY environment variable is required');
    console.error('Set it with: export AI_API_KEY=your-api-key');
    process.exit(1);
  }

  const concurrency = concurrencyArg ? parseInt(concurrencyArg.split('=')[1]) : AI_CONFIG.concurrency;

  if (allChars) {
    const slugs = listCharacters();
    console.log(`Generating content for ${slugs.length} characters...`);
    generateBatch(slugs, concurrency)
      .then(() => console.log('\n✅ All content generated!'))
      .catch(err => {
        console.error('Generation failed:', err);
        process.exit(1);
      });
  } else if (charArg) {
    const slug = charArg.split('=')[1];

    if (typeArg) {
      const type = typeArg.split('=')[1] as ContentType;
      generateContent(slug, type)
        .then(() => console.log('\n✅ Content generated!'))
        .catch(err => {
          console.error('Generation failed:', err);
          process.exit(1);
        });
    } else {
      generateAllTypes(slug)
        .then(() => console.log('\n✅ All content generated!'))
        .catch(err => {
          console.error('Generation failed:', err);
          process.exit(1);
        });
    }
  } else {
    console.error('Usage:');
    console.error('  npx tsx src/scripts/generate.ts --char=kafka --type=character');
    console.error('  npx tsx src/scripts/generate.ts --char=kafka --all');
    console.error('  npx tsx src/scripts/generate.ts --all-chars --concurrency=10');
    process.exit(1);
  }
}

export { generateContent, generateAllTypes };
