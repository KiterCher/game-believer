import * as fs from 'fs';
import * as path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');

export function readJson<T>(relativePath: string): T {
  const fullPath = path.join(DATA_DIR, relativePath);
  const content = fs.readFileSync(fullPath, 'utf-8');
  return JSON.parse(content) as T;
}

export function readCharacterData(slug: string) {
  return {
    core: readJson<any>(`characters/${slug}/core.json`),
    skills: readJson<any>(`characters/${slug}/skills.json`),
    traces: readJson<any>(`characters/${slug}/traces.json`),
    eidolons: readJson<any>(`characters/${slug}/eidolons.json`),
    stats: readJson<any>(`characters/${slug}/stats.json`),
    materials: readJson<any>(`characters/${slug}/materials.json`),
  };
}

export function readKeywords(slug: string) {
  return readJson<any>(`keywords/${slug}-keywords.json`);
}

export function listCharacters(): string[] {
  const charsDir = path.join(DATA_DIR, 'characters');
  return fs.readdirSync(charsDir).filter(dir => {
    const fullPath = path.join(charsDir, dir);
    return fs.statSync(fullPath).isDirectory();
  });
}
