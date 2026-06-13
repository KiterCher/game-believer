import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const charactersCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/characters' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updatedAt: z.string(),
    type: z.string(),
    character: z.string(),
  }),
});

const buildsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/builds' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updatedAt: z.string(),
    type: z.string(),
    character: z.string(),
  }),
});

const teamsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/teams' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updatedAt: z.string(),
    type: z.string(),
    character: z.string(),
  }),
});

const pullAdviceCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pull-advice' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updatedAt: z.string(),
    type: z.string(),
    character: z.string(),
  }),
});

export const collections = {
  characters: charactersCollection,
  builds: buildsCollection,
  teams: teamsCollection,
  'pull-advice': pullAdviceCollection,
};
