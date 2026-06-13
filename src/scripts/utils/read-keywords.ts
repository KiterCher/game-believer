import { readJson } from './read-json';
import type { KeywordData } from '../types';

export function readKeywordData(slug: string): KeywordData {
  return readJson<KeywordData>(`keywords/${slug}-keywords.json`);
}
