export interface CharacterData {
  id: string;
  name: string;
  nameEn: string;
  rarity: 4 | 5;
  element: Element;
  path: Path;
  faction: string;
  releaseVersion: string;
  releaseDate: string;
  description: string;
  role: string;
  tags: string[];
}

export type Element = 'Physical' | 'Fire' | 'Ice' | 'Lightning' | 'Wind' | 'Quantum' | 'Imaginary';
export type Path = 'Destruction' | 'Hunt' | 'Erudition' | 'Harmony' | 'Nihility' | 'Preservation' | 'Abundance';

export interface SkillData {
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

export interface TraceData {
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

export interface EidolonData {
  eidolons: Eidolon[];
}

export interface Eidolon {
  level: number;
  name: string;
  description: string;
}

export interface StatsData {
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

export interface MaterialData {
  ascension: Material[];
  traces: Material[];
}

export interface Material {
  name: string;
  amount: number | string;
}

export interface LightConeData {
  id: string;
  name: string;
  nameEn: string;
  rarity: 4 | 5;
  path: Path;
  stats: {
    hp: number;
    atk: number;
    def: number;
  };
  passive: {
    name: string;
    description: string;
  };
  lore: string;
}

export interface KeywordData {
  characterId: string;
  mainKeyword: string;
  secondaryKeywords: string[];
  longTailFAQs: string[];
}
