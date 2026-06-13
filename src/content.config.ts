import { defineCollection, z } from 'astro:content';

const charactersCollection = defineCollection({
  schema: z.object({
    name: z.string(),
    nameEn: z.string(),
    rarity: z.number().min(4).max(5),
    element: z.enum(['Physical', 'Fire', 'Ice', 'Lightning', 'Wind', 'Quantum', 'Imaginary']),
    path: z.enum(['Destruction', 'Hunt', 'Erudition', 'Harmony', 'Nihility', 'Preservation', 'Abundance']),
    image: z.string().optional(),
    releaseDate: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const buildsCollection = defineCollection({
  schema: z.object({
    characterId: z.string(),
    title: z.string(),
    description: z.string(),
    tier: z.enum(['S', 'A', 'B', 'C']),
    recommendedLightCones: z.array(z.string()).optional(),
    recommendedRelics: z.array(z.string()).optional(),
    stats: z.object({
      body: z.string().optional(),
      feet: z.string().optional(),
      sphere: z.string().optional(),
      rope: z.string().optional(),
    }).optional(),
  }),
});

const teamsCollection = defineCollection({
  schema: z.object({
    characterId: z.string(),
    teamName: z.string(),
    description: z.string(),
    members: z.array(z.string()),
    difficulty: z.enum(['Easy', 'Medium', 'Hard']).optional(),
  }),
});

export const collections = {
  characters: charactersCollection,
  builds: buildsCollection,
  teams: teamsCollection,
};
