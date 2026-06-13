import type { CharacterData, ContentType } from '../types';

export function formatCharacterData(data: CharacterData): string {
  return JSON.stringify(data, null, 2);
}

export function getPromptFilename(slug: string, type: ContentType): string {
  return `temp/prompt-${slug}-${type}.txt`;
}

export function getOutputFilename(slug: string, type: ContentType): string {
  const typeMap: Record<ContentType, string> = {
    'character': 'characters',
    'build': 'builds',
    'team': 'teams',
    'pull-advice': 'pull-advice',
    'faq': 'faq',
  };
  return `src/content/${typeMap[type]}/${slug}.md`;
}
