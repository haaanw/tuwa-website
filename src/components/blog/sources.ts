/**
 * Count an article's cited sources from its own body, at build time.
 *
 * The number on the page must be a COUNT, not a claim. A series whose entire
 * value is checkable citations cannot ship a hand-typed "26 sources" that drifts
 * the moment a reference is added — so nothing here is authored in frontmatter.
 *
 * Returns 0 when no source list is found, and the byline then omits the figure
 * entirely rather than printing a zero.
 */

/** Matches the sources heading in every locale the site publishes. */
const SOURCES_HEADING = /^#{2,3}\s+(sources|références|参考文献|资料来源)\s*$/im;

export function countSources(body: string | undefined): number {
  if (!body) return 0;

  const match = SOURCES_HEADING.exec(body);
  if (!match) return 0;

  const after = body.slice(match.index + match[0].length);

  let count = 0;
  for (const rawLine of after.split('\n')) {
    const line = rawLine.trim();
    // A later heading of the same or higher level ends the source list.
    if (/^#{1,3}\s/.test(line)) break;
    // Top-level list items only. Continuation lines are indented and must not
    // be counted as separate references.
    if (/^[-*]\s+\S/.test(rawLine) && !/^\s/.test(rawLine)) count++;
  }
  return count;
}
