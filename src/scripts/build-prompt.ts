import * as fs from 'fs';
import * as path from 'path';
import { readCharacterData, readKeywords } from './utils/read-json';
import type { CharacterData, ContentType, PromptContext } from './types';

const PROMPTS_DIR = path.join(process.cwd(), 'prompts');
const TEMP_DIR = path.join(process.cwd(), 'temp');

// Ensure temp directory exists
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

function readPromptTemplate(type: ContentType): string {
  const templateMap: Record<ContentType, string> = {
    'character': 'character-prompt.md',
    'build': 'build-prompt.md',
    'team': 'team-prompt.md',
    'pull-advice': 'pull-prompt.md',
    'faq': 'faq-prompt.md',
  };

  const templatePath = path.join(PROMPTS_DIR, templateMap[type]);
  return fs.readFileSync(templatePath, 'utf-8');
}

function formatCharacterForPrompt(data: CharacterData): string {
  return `## Character Basic Info
- Name: ${data.core.name}
- Rarity: ${data.core.rarity}★
- Element: ${data.core.element}
- Path: ${data.core.path}
- Faction: ${data.core.faction}
- Role: ${data.core.role}
- Release Version: ${data.core.releaseVersion}
- Tags: ${data.core.tags.join(', ')}

## Description
${data.core.description}

## Skills
### Basic Attack: ${data.skills.basicAttack.name}
${data.skills.basicAttack.description}

### Skill: ${data.skills.skill.name}
${data.skills.skill.description}

### Ultimate: ${data.skills.ultimate.name}
${data.skills.ultimate.description}
Energy Cost: ${data.skills.ultimate.energyCost}

### Talent: ${data.skills.talent.name}
${data.skills.talent.description}

### Technique: ${data.skills.technique.name}
${data.skills.technique.description}

## Major Traces
${data.traces.majorTraces.map(t => `- **${t.name}** (${t.unlockLevel}): ${t.description}`).join('\n')}

## Eidolons
${data.eidolons.eidolons.map(e => `- **E${e.level} ${e.name}**: ${e.description}`).join('\n')}

## Base Stats (Level 80)
- HP: ${data.stats.baseStats.hp[9]}
- ATK: ${data.stats.baseStats.atk[9]}
- DEF: ${data.stats.baseStats.def[9]}
- SPD: ${data.stats.baseStats.spd}

## Materials
### Ascension Materials
${data.materials.ascension.map(m => `- ${m.name}: ${m.amount}`).join('\n')}

### Trace Materials
${data.materials.traces.map(m => `- ${m.name}: ${m.amount}`).join('\n')}`;
}

function formatKeywordsForPrompt(keywords: any): string {
  return `## Main Keyword
${keywords.mainKeyword}

## Secondary Keywords
${keywords.secondaryKeywords.join(', ')}

## Long-Tail FAQs (use these for FAQ section)
${keywords.longTailFAQs.map((faq: string, i: number) => `${i + 1}. ${faq}`).join('\n')}`;
}

export function buildPrompt(slug: string, type: ContentType): string {
  console.log(`Building prompt for ${slug}/${type}...`);

  // 1. Read character data
  const characterData = readCharacterData(slug);

  // 2. Read keywords
  const keywords = readKeywords(slug);

  // 3. Read prompt template
  let template = readPromptTemplate(type);

  // 4. Replace placeholders
  template = template.replace('{Character Name}', characterData.core.name);
  template = template.replace('{char}', characterData.core.name);
  template = template.replace('{role}', characterData.core.role);
  template = template.replace('{element}', characterData.core.element);
  template = template.replace('{path}', characterData.core.path);
  template = template.replace('{mainKeyword}', keywords.mainKeyword);
  template = template.replace('{secondaryKeywords}', keywords.secondaryKeywords.join(', '));

  // 5. Inject data
  template = template.replace('{characterData}', formatCharacterForPrompt(characterData));
  template = template.replace('{keywords}', formatKeywordsForPrompt(keywords));
  template = template.replace('{longTailFAQs}', keywords.longTailFAQs.join('\n'));

  // 6. Save to temp file
  const outputFile = path.join(TEMP_DIR, `prompt-${slug}-${type}.txt`);
  fs.writeFileSync(outputFile, template, 'utf-8');
  console.log(`Prompt saved to: ${outputFile}`);

  return template;
}

// CLI entry point
if (require.main === module) {
  const args = process.argv.slice(2);
  const slugArg = args.find(a => a.startsWith('--char='));
  const typeArg = args.find(a => a.startsWith('--type='));

  if (!slugArg || !typeArg) {
    console.error('Usage: npx tsx src/scripts/build-prompt.ts --char=kafka --type=character');
    process.exit(1);
  }

  const slug = slugArg.split('=')[1];
  const type = typeArg.split('=')[1] as ContentType;

  const prompt = buildPrompt(slug, type);
  console.log('\n=== Generated Prompt ===\n');
  console.log(prompt.substring(0, 500) + '...\n');
  console.log(`Total length: ${prompt.length} characters`);
}
