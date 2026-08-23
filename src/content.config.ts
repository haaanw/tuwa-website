import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    coverImage: z.string().optional(),
    // Last substantive revision. Feeds Article.dateModified; falls back to `date`.
    updated: z.coerce.date().optional(),
    // Question/answer pairs lifted VERBATIM from the body. FAQPage schema quotes the
    // page, so an answer here that the article does not also state on the page is an
    // unbacked claim shipped straight to an answer engine — keep the two in step.
    faq: z
      .array(z.object({ q: z.string(), a: z.string() }))
      .optional(),
  }),
});

export const collections = { blog };
