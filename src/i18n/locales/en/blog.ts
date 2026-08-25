type WidenStrings<T> = T extends string
  ? string
  : T extends readonly any[]
  ? { [K in keyof T]: WidenStrings<T[K]> }
  : { [K in keyof T]: WidenStrings<T[K]> };

const blog = {
  meta: {
    title: 'Training science',
    description:
      'Fact-dense, citation-backed articles on the science under self-coached training — the algorithms Tuwa ships, and the research behind them.',
  },
  page: {
    heading: 'Blog',
    emptyState: 'Posts coming soon.',
  },
  // The series index. Every number shown on this page is computed from the
  // articles themselves — see components/blog/sources.ts.
  index: {
    kicker: 'Tuwa · training science',
    heading: 'Where the evidence actually stands',
    blurb:
      'Fact-dense, citation-backed articles on the science under self-coached training — the algorithms this app ships, and the research behind them. Every empirical claim carries a checkable source, graded honestly.',
    statArticles: 'Articles',
    statSources: 'Sources cited',
    statCadence: 'Cadence',
    statCadenceValue: 'Weekly',
    statLatest: 'Latest',
    colNo: 'No.',
    colArticle: 'Article',
    colClass: 'Class',
    colSources: 'Sources',
    colRead: 'Read',
    readSuffix: 'min',
  },
} as const;

export default blog;
export type Blog = WidenStrings<typeof blog>;
