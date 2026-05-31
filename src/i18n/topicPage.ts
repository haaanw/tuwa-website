// Shared content shape for the keyword/topic hub pages
// (/methodology, /training-load, /readiness-score, /for-coaches, /compare).
// One uniform type across all five so a single TopicPageLayout renders them all.

export interface TopicSection {
  heading: string;
  subheading?: string;
  body: string[];
  bullets?: string[];
}

export interface TopicPageContent {
  meta: { title: string; description: string };
  hero: { outcomeStatement: string; hookLine: string };
  sections: TopicSection[];
  related?: {
    heading: string;
    links: { label: string; href: string }[];
  };
  references?: {
    heading: string;
    items: { label: string; url: string }[];
  };
}
