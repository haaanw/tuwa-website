type WidenStrings<T> = T extends string
  ? string
  : T extends readonly any[]
  ? { [K in keyof T]: WidenStrings<T[K]> }
  : { [K in keyof T]: WidenStrings<T[K]> };

const blog = {
  meta: {
    title: 'Blog',
    description: 'Training science, recovery insights, and coaching notes from Tuwa.',
  },
  page: {
    heading: 'Blog',
    emptyState: 'Posts coming soon.',
  },
} as const;

export default blog;
export type Blog = WidenStrings<typeof blog>;
