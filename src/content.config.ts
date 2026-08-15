import { defineCollection, z } from 'astro:content';
import { defaultAuthorId } from './data/authors';

const insights = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        category: z.enum(['Research']),
        /** Additive classification alongside category — e.g. 'Premise' for foundational pieces the rest of the corpus derives from. */
        tags: z.array(z.enum(['Premise'])).default([]),
        date: z.coerce.date(),
        summary: z.string(),
        author: z.string().default(defaultAuthorId),
    }),
});

export const collections = { insights };
