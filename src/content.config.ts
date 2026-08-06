import { defineCollection, z } from 'astro:content';

const insights = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        category: z.enum(['Case Studies', 'Research']),
        date: z.coerce.date(),
        summary: z.string(),
    }),
});

export const collections = { insights };
