export interface Character {
  id: string;
  name: string;
  nameEn: string;
  rarity: 4 | 5;
  element: Element;
  path: Path;
  image?: string;
  releaseDate?: string;
  tags?: string[];
}

export type Element = 'Physical' | 'Fire' | 'Ice' | 'Lightning' | 'Wind' | 'Quantum' | 'Imaginary';

export type Path = 'Destruction' | 'Hunt' | 'Erudition' | 'Harmony' | 'Nihility' | 'Preservation' | 'Abundance';

export interface CharacterData {
  core: CharacterCore;
  skills: Skill[];
  traces: Trace[];
  eidolons: Eidolon[];
  stats: CharacterStats;
  materials: Material[];
}

export interface CharacterCore {
  id: string;
  name: string;
  nameEn: string;
  rarity: number;
  element: string;
  path: string;
  faction: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  type: 'Basic' | 'Skill' | 'Ultimate' | 'Talent' | 'Technique';
  description: string;
  multiplier: string;
}

export interface Trace {
  id: string;
  name: string;
  type: 'Minor' | 'Major';
  description: string;
  requires?: string[];
}

export interface Eidolon {
  level: number;
  name: string;
  description: string;
}

export interface CharacterStats {
  hp: number[];
  atk: number[];
  def: number[];
  spd: number;
}

export interface Material {
  id: string;
  name: string;
  amount: number;
}
