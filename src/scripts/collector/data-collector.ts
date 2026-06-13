import * as fs from 'fs';
import * as path from 'path';
import { UNIQUE_CHARACTERS, type CharacterInfo } from './character-list';
import type {
  CharacterData,
  SkillData,
  TraceData,
  EidolonData,
  StatsData,
  MaterialData,
  KeywordData,
} from './types';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const CHARACTERS_DIR = path.join(DATA_DIR, 'characters');
const KEYWORDS_DIR = path.join(DATA_DIR, 'keywords');

// 确保目录存在
function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// 生成角色核心数据
export function generateCharacterCore(char: CharacterInfo): CharacterData {
  return {
    id: char.id,
    name: char.name,
    nameEn: char.nameEn,
    rarity: char.rarity,
    element: char.element as any,
    path: char.path as any,
    faction: char.faction,
    releaseVersion: char.releaseVersion,
    releaseDate: '',
    description: `${char.nameEn} is a ${char.rarity}-star ${char.element} character following the Path of ${char.path}.`,
    role: determineRole(char),
    tags: determineTags(char),
  };
}

// 判断角色定位
function determineRole(char: CharacterInfo): string {
  const pathRoles: Record<string, string> = {
    Destruction: 'DPS',
    Hunt: 'Single-Target DPS',
    Erudition: 'AoE DPS',
    Harmony: 'Support',
    Nihility: 'Debuffer/Sub-DPS',
    Preservation: 'Tank',
    Abundance: 'Healer',
  };
  return pathRoles[char.path] || 'DPS';
}

// 判断角色标签
function determineTags(char: CharacterInfo): string[] {
  const tags: string[] = [];

  // 根据命途添加标签
  if (char.path === 'Destruction') tags.push('DPS', 'AoE');
  if (char.path === 'Hunt') tags.push('Single-Target', 'Burst');
  if (char.path === 'Erudition') tags.push('AoE', 'DoT');
  if (char.path === 'Harmony') tags.push('Support', 'Buffer');
  if (char.path === 'Nihility') tags.push('Debuff', 'DoT');
  if (char.path === 'Preservation') tags.push('Tank', 'Shield');
  if (char.path === 'Abundance') tags.push('Healer', 'Sustain');

  // 根据属性添加标签
  if (char.element === 'Lightning') tags.push('Shock');
  if (char.element === 'Fire') tags.push('Burn');
  if (char.element === 'Wind') tags.push('Wind Shear');
  if (char.element === 'Physical') tags.push('Bleed');
  if (char.element === 'Ice') tags.push('Freeze');
  if (char.element === 'Quantum') tags.push('Entanglement');
  if (char.element === 'Imaginary') tags.push('Imprisonment');

  return tags;
}

// 生成关键词数据
export function generateKeywords(char: CharacterInfo): KeywordData {
  const name = char.nameEn;
  const mainKeyword = `${name} Build`;

  const secondaryKeywords = [
    `${name} Best Build`,
    `${name} Relics`,
    `${name} Light Cone`,
    `${name} Team`,
    `${name} Guide`,
    `Honkai Star Rail ${name}`,
    `HSR ${name}`,
    `${name} ${char.path}`,
    `${name} Best Team`,
    `${name} ${char.element}`,
  ];

  const longTailFAQs = [
    `What is the best build for ${name} in HSR?`,
    `What relics should I use for ${name}?`,
    `What is ${name}'s best light cone?`,
    `What team is best for ${name}?`,
    `Is ${name} good in Honkai Star Rail?`,
    `What does ${name} scale with in HSR?`,
    `Is ${name} a DPS or support?`,
    `What is ${name}'s best F2P light cone?`,
    `How to build ${name} for maximum damage?`,
    `Is ${name} worth pulling in 2026?`,
  ];

  return {
    characterId: char.id,
    mainKeyword,
    secondaryKeywords,
    longTailFAQs,
  };
}

// 保存角色数据
export function saveCharacterData(char: CharacterInfo): void {
  const charDir = path.join(CHARACTERS_DIR, char.id);
  ensureDir(charDir);

  // 生成并保存核心数据
  const coreData = generateCharacterCore(char);
  fs.writeFileSync(
    path.join(charDir, 'core.json'),
    JSON.stringify(coreData, null, 2),
    'utf-8'
  );

  // 生成技能数据（示例）
  const skillsData: SkillData = {
    basicAttack: {
      name: `${char.nameEn}'s Basic Attack`,
      type: 'Basic Attack',
      description: `Deals damage to a single enemy.`,
    },
    skill: {
      name: `${char.nameEn}'s Skill`,
      type: 'Skill',
      description: `Deals damage to enemies.`,
    },
    ultimate: {
      name: `${char.nameEn}'s Ultimate`,
      type: 'Ultimate',
      description: `Deals massive damage to all enemies.`,
      energyCost: 100,
    },
    talent: {
      name: `${char.nameEn}'s Talent`,
      type: 'Talent',
      description: `Passive effect.`,
    },
    technique: {
      name: `${char.nameEn}'s Technique`,
      type: 'Technique',
      description: `Technique effect.`,
    },
  };
  fs.writeFileSync(
    path.join(charDir, 'skills.json'),
    JSON.stringify(skillsData, null, 2),
    'utf-8'
  );

  // 生成行迹数据
  const tracesData: TraceData = {
    majorTraces: [
      {
        id: 'trace1',
        name: 'Major Trace 1',
        description: `Unlock at A2.`,
        unlockLevel: 'A2',
      },
      {
        id: 'trace2',
        name: 'Major Trace 2',
        description: `Unlock at A4.`,
        unlockLevel: 'A4',
      },
      {
        id: 'trace3',
        name: 'Major Trace 3',
        description: `Unlock at A6.`,
        unlockLevel: 'A6',
      },
    ],
    minorTraces: [
      { type: 'ATK%', value: '28%' },
      { type: 'HP%', value: '18%' },
      { type: 'DEF%', value: '12.5%' },
    ],
  };
  fs.writeFileSync(
    path.join(charDir, 'traces.json'),
    JSON.stringify(tracesData, null, 2),
    'utf-8'
  );

  // 生成星魂数据
  const eidolonsData: EidolonData = {
    eidolons: Array.from({ length: 6 }, (_, i) => ({
      level: i + 1,
      name: `Eidolon ${i + 1}`,
      description: `Effect for Eidolon ${i + 1}.`,
    })),
  };
  fs.writeFileSync(
    path.join(charDir, 'eidolons.json'),
    JSON.stringify(eidolonsData, null, 2),
    'utf-8'
  );

  // 生成属性数据
  const statsData: StatsData = {
    baseStats: {
      hp: [100, 200, 300, 400, 500],
      atk: [50, 100, 150, 200, 250],
      def: [30, 60, 90, 120, 150],
      spd: 100,
    },
    ascensionStats: [],
  };
  fs.writeFileSync(
    path.join(charDir, 'stats.json'),
    JSON.stringify(statsData, null, 2),
    'utf-8'
  );

  // 生成材料数据
  const materialsData: MaterialData = {
    ascension: [],
    traces: [],
  };
  fs.writeFileSync(
    path.join(charDir, 'materials.json'),
    JSON.stringify(materialsData, null, 2),
    'utf-8'
  );

  console.log(`✅ Generated data for ${char.nameEn}`);
}

// 保存关键词数据
export function saveKeywordData(char: CharacterInfo): void {
  ensureDir(KEYWORDS_DIR);

  const keywords = generateKeywords(char);
  fs.writeFileSync(
    path.join(KEYWORDS_DIR, `${char.id}-keywords.json`),
    JSON.stringify(keywords, null, 2),
    'utf-8'
  );

  console.log(`✅ Generated keywords for ${char.nameEn}`);
}

// 主函数：收集所有角色数据
export function collectAllCharacters(): void {
  console.log('🚀 Starting HSR Data Collector...\n');

  ensureDir(CHARACTERS_DIR);
  ensureDir(KEYWORDS_DIR);

  let count = 0;
  for (const char of UNIQUE_CHARACTERS) {
    saveCharacterData(char);
    saveKeywordData(char);
    count++;
  }

  console.log(`\n✅ Collected data for ${count} characters`);
  console.log(`📁 Characters directory: ${CHARACTERS_DIR}`);
  console.log(`📁 Keywords directory: ${KEYWORDS_DIR}`);
}

// CLI 入口
if (require.main === module) {
  collectAllCharacters();
}
