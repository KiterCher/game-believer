export interface Build {
  id: string;
  characterId: string;
  title: string;
  description: string;
  tier: 'S' | 'A' | 'B' | 'C';
  lightCones: LightConeRecommendation[];
  relics: RelicRecommendation[];
  stats: StatRecommendation;
  subStats: string[];
  playstyle: string;
}

export interface LightConeRecommendation {
  id: string;
  name: string;
  rank: number; // 1 = Best, 2 = Good, 3 = Alternative
  description?: string;
}

export interface RelicRecommendation {
  id: string;
  name: string;
  pieces: 2 | 4;
  description?: string;
}

export interface StatRecommendation {
  body: string[];
  feet: string[];
  sphere: string[];
  rope: string[];
}

export interface Team {
  id: string;
  characterId: string;
  name: string;
  description: string;
  members: TeamMember[];
  rotation?: string;
  tips?: string[];
}

export interface TeamMember {
  characterId: string;
  role: 'DPS' | 'Support' | 'Sustain' | 'Sub-DPS';
  isFlex?: boolean;
}
