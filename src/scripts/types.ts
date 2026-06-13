export type ContentType = 'character' | 'build' | 'team' | 'pull-advice' | 'faq';

export interface CharacterCore {
  id: string;
  name: string;
  nameEn: string;
  rarity: number;
  element: string;
  path: string;
  faction: string;
  releaseVersion: string;
  releaseDate: string;
  description: string;
  role: string;
  tags: string[];
}

export interface CharacterSkills {
  basicAttack: SkillDetail;
  skill: SkillDetail;
  ultimate: SkillDetail;
  talent: SkillDetail;
  technique: SkillDetail;
}

export interface SkillDetail {
  name: string;
  type: string;
  description: string;
  multiplier?: string;
  energyCost?: number;
}

export interface CharacterTraces {
  majorTraces: Trace[];
  minorTraces: TraceStat[];
}

export interface Trace {
  id: string;
  name: string;
  description: string;
  unlockLevel: string;
}

export interface TraceStat {
  type: string;
  value: string;
}

export interface CharacterEidolons {
  eidolons: Eidolon[];
}

export interface Eidolon {
  level: number;
  name: string;
  description: string;
}

export interface CharacterStats {
  baseStats: {
    hp: number[];
    atk: number[];
    def: number[];
    spd: number;
  };
  ascensionStats: {
    level: number;
    stat: string;
    value: string;
  }[];
}

export interface CharacterMaterials {
  ascension: Material[];
  traces: Material[];
}

export interface Material {
  name: string;
  amount: number | string;
}

export interface CharacterData {
  core: CharacterCore;
  skills: CharacterSkills;
  traces: CharacterTraces;
  eidolons: CharacterEidolons;
  stats: CharacterStats;
  materials: CharacterMaterials;
}

export interface KeywordData {
  characterId: string;
  mainKeyword: string;
  secondaryKeywords: string[];
  longTailFAQs: string[];
  competitorUrls: string[];
}

export interface PromptContext {
  characterData: CharacterData;
  keywords: KeywordData;
  type: ContentType;
}

export interface QARule {
  enabled: boolean;
  severity: 'error' | 'warning';
  min?: number;
  max?: number;
  min_chars?: number;
  max_chars?: number;
}

export interface QARules {
  rules: Record<string, QARule>;
}

export interface QAIssue {
  rule: string;
  severity: 'error' | 'warning';
  message: string;
  line?: number;
}

export interface QAResult {
  passed: boolean;
  score: number;
  errors: QAIssue[];
  warnings: QAIssue[];
  fixes: string[];
}
