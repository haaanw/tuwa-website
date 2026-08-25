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
    // ---- Presentation, added with the magazine layout (HAN ruling 2026-08-25).
    // All optional: the one pre-existing post validates unchanged and renders
    // with sensible fallbacks.
    //
    // Standfirst. Falls back to `description`, which is what the old layout
    // displayed, so omitting it changes nothing.
    deck: z.string().optional(),
    // The article's class under SCIENCE-SERIES.md rule 0 — shown as the kicker.
    articleClass: z.string().optional(),
    // Position in the series. Renders as "No. 01".
    seriesNo: z.number().int().positive().optional(),
    // Which figure carries the listing card. Must be a key in
    // components/blog/figures.ts; an unknown key fails the build.
    leadFigure: z.string().optional(),
  }),
});

export const collections = { blog };
