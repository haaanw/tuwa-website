type WidenStrings<T> = T extends string
  ? string
  : T extends readonly any[]
  ? { [K in keyof T]: WidenStrings<T[K]> }
  : { [K in keyof T]: WidenStrings<T[K]> };

const notFound = {
  meta: {
    title: 'Page Not Found',
    description: "The page you were looking for doesn't exist.",
  },
  heading: 'Page not found',
  body: "The page you're looking for doesn't exist or has been moved.",
  cta: 'Go back home',
} as const;

export default notFound;
export type NotFound = WidenStrings<typeof notFound>;
