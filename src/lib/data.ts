export type RichTextDocument = {
  type: "doc";
  content?: unknown[];
};

export type ArticleBody = string[] | RichTextDocument;

export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: "News" | "Leak" | "Character" | "Vehicle" | "Location";
  date: string;
  image: string;
  imageAlt: string;
  imageCredit?: string;
  tag?: string;
  body?: ArticleBody;
};

export type Entity = {
  id: string;
  slug: string;
  name: string;
  type: "Character" | "Vehicle" | "Location";
  summary: string;
  meta: string;
  image: string;
};

export const navLinks = [
  { href: "/news", label: "News" },
  { href: "/characters", label: "Characters" },
  { href: "/vehicles", label: "Vehicles" },
  { href: "/locations", label: "Locations" },
  { href: "/leaks", label: "Leaks" },
] as const;

export const utilityLinks = [
  { href: "/database", label: "Database" },
  { href: "/map", label: "Map" },
  { href: "/about", label: "About" },
] as const;

export const featuredSlides: Article[] = [
  {
    id: "0",
    slug: "gta-6-extended-look-netflix-august-27",
    title: "GTA 6 Extended Look Trailer Releases on Netflix on August 27th",
    excerpt:
      "Rockstar's extended look at Grand Theft Auto VI premieres for Netflix subscribers at 3 p.m. ET on August 27.",
    category: "News",
    date: "Aug 27, 2026",
    image: "url('/gta6net.jpg')",
    imageAlt:
      "Lucia and Jason featured in artwork for the GTA 6 extended look",
    imageCredit: "Image credit: Rockstar Games / Netflix",
    tag: "Featured",
    body: [
      "Rockstar Games and Netflix have announced that Grand Theft Auto VI: An Extended Look will premiere globally for Netflix subscribers on August 27 at 3 p.m. ET.",
      "According to Netflix, the presentation was captured entirely from in-game footage on PlayStation 5 and will offer a closer look at the next entry in the Grand Theft Auto series.",
      "The extended look will be available with subtitles in multiple languages. Grand Theft Auto VI is currently scheduled to launch on PlayStation 5 and Xbox Series X|S on November 19, 2026.",
    ],
  },
  {
    id: "1",
    slug: "gta-6-trailer-2-everything-we-spotted",
    title: "GTA 6 Trailer 2: Everything We Spotted in Leonida",
    excerpt:
      "From Vice City neon to backroad hideouts — the second trailer is packed with locations, vehicles, and story teases.",
    category: "News",
    date: "Mar 12, 2026",
    image:
      "linear-gradient(135deg, #1a0a2e 0%, #ff2d6a 45%, #1896fe 100%)",
    imageAlt: "Neon Vice City skyline concept",
    imageCredit: "Source: Rockstar Games",
    tag: "Featured",
  },
  {
    id: "2",
    slug: "lucia-jason-what-we-know",
    title: "Lucia & Jason: What We Know About GTA 6’s Protagonists",
    excerpt:
      "Rockstar’s first female lead and her partner — confirmed details, casting rumors, and story hints so far.",
    category: "Character",
    date: "Mar 8, 2026",
    image:
      "linear-gradient(135deg, #0f172a 0%, #7c3aed 40%, #f97316 100%)",
    imageAlt: "Character silhouette concept",
    imageCredit: "Image credit: Rockstar Games",
    tag: "Deep Dive",
  },
];

export const sidebarUpdates = [
  {
    id: "s1",
    label: "Trailer 2 stills catalogued",
    time: "2h ago",
    href: "/news/gta-6-trailer-2-everything-we-spotted",
  },
  {
    id: "s2",
    label: "New Leonida Keys entry added",
    time: "5h ago",
    href: "/locations",
  },
  {
    id: "s3",
    label: "Vehicle DB: 12 cars from Trailer 2",
    time: "1d ago",
    href: "/vehicles",
  },
  {
    id: "s4",
    label: "Leak roundup: what’s verified",
    time: "2d ago",
    href: "/leaks",
  },
  {
    id: "s5",
    label: "Lucia profile expanded",
    time: "3d ago",
    href: "/characters/lucia",
  },
  {
    id: "s6",
    label: "Map markers: Vice Beach update",
    time: "4d ago",
    href: "/map",
  },
];

export const latestNews: Article[] = [
  {
    id: "n1",
    slug: "rockstar-job-listings-hint-online",
    title: "Rockstar Job Listings Hint at Ambitious Online Launch",
    excerpt: "Backend and live-ops roles suggest GTA Online 2 is already in heavy prep.",
    category: "News",
    date: "Mar 11, 2026",
    image: "linear-gradient(135deg, #111827, #1896fe)",
    imageAlt: "Abstract network graphic",
    imageCredit: "Image credit: Rockstar Games",
  },
  {
    id: "n2",
    slug: "ps5-pro-enhancements-expected",
    title: "PS5 Pro Enhancements Expected at Launch",
    excerpt: "Higher fidelity targets and 60fps modes are the current industry bet.",
    category: "News",
    date: "Mar 10, 2026",
    image: "linear-gradient(135deg, #1e293b, #6366f1)",
    imageAlt: "Console silhouette",
    imageCredit: "Image credit: Rockstar Games",
  },
  {
    id: "n3",
    slug: "florida-inspiration-tour",
    title: "Florida Inspiration Tour: Real Places Behind Leonida",
    excerpt: "Miami, the Keys, and swamplands mapped against Trailer 2 frames.",
    category: "Location",
    date: "Mar 9, 2026",
    image: "linear-gradient(135deg, #134e4a, #f59e0b)",
    imageAlt: "Coastal landscape",
    imageCredit: "Image credit: Rockstar Games",
  },
  {
    id: "n4",
    slug: "take-two-earnings-gta6",
    title: "Take-Two Earnings: What Management Said About GTA 6",
    excerpt: "Guidance language, marketing spend signals, and the autumn window.",
    category: "News",
    date: "Mar 7, 2026",
    image: "linear-gradient(135deg, #312e81, #22d3ee)",
    imageAlt: "Finance chart abstract",
    imageCredit: "Image credit: Rockstar Games",
  },
];

export const characters: Entity[] = [
  {
    id: "c1",
    slug: "lucia",
    name: "Lucia",
    type: "Character",
    summary: "GTA’s first female protagonist — sharp, resourceful, and central to the heist life.",
    meta: "Protagonist",
    image: "linear-gradient(135deg, #831843, #fb7185)",
  },
  {
    id: "c2",
    slug: "jason",
    name: "Jason",
    type: "Character",
    summary: "Lucia’s partner in crime. Calm under pressure with a southern edge.",
    meta: "Protagonist",
    image: "linear-gradient(135deg, #1e3a5f, #38bdf8)",
  },
  {
    id: "c3",
    slug: "boobie-ike",
    name: "Boobie Ike",
    type: "Character",
    summary: "Vice City personality spotted in marketing — local fame meets street politics.",
    meta: "Supporting",
    image: "linear-gradient(135deg, #713f12, #fbbf24)",
  },
  {
    id: "c4",
    slug: "cal-hampton",
    name: "Cal Hampton",
    type: "Character",
    summary: "Associated with Jason’s circle — details still being pieced together.",
    meta: "Supporting",
    image: "linear-gradient(135deg, #365314, #a3e635)",
  },
];

export const vehicles: Entity[] = [
  {
    id: "v1",
    slug: "invetero-coquette",
    name: "Invetero Coquette D10",
    type: "Vehicle",
    summary: "Classic sports silhouette refreshed for Leonida’s highways.",
    meta: "Sports",
    image: "linear-gradient(135deg, #7f1d1d, #fb923c)",
  },
  {
    id: "v2",
    slug: "declasse-tampa",
    name: "Declasse Tampa GT",
    type: "Vehicle",
    summary: "Muscle energy built for coastal cruising and quick getaways.",
    meta: "Muscle",
    image: "linear-gradient(135deg, #1e293b, #94a3b8)",
  },
  {
    id: "v3",
    slug: "pegassi-torero",
    name: "Pegassi Torero XO",
    type: "Vehicle",
    summary: "Supercar presence teased across multiple trailer cuts.",
    meta: "Super",
    image: "linear-gradient(135deg, #312e81, #c4b5fd)",
  },
  {
    id: "v4",
    slug: "boat-dinghy",
    name: "Coastal Dinghy",
    type: "Vehicle",
    summary: "Water escapes matter in a state built on islands and inlets.",
    meta: "Boat",
    image: "linear-gradient(135deg, #0e7490, #67e8f9)",
  },
];

export const locations: Entity[] = [
  {
    id: "l1",
    slug: "vice-city",
    name: "Vice City",
    type: "Location",
    summary: "Neon towers, beaches, and the cultural heart of Leonida.",
    meta: "City",
    image: "linear-gradient(135deg, #9d174d, #67e8f9)",
  },
  {
    id: "l2",
    slug: "leonida-keys",
    name: "Leonida Keys",
    type: "Location",
    summary: "Island chain energy — boats, bridges, and hideouts.",
    meta: "Region",
    image: "linear-gradient(135deg, #115e59, #fde68a)",
  },
  {
    id: "l3",
    slug: "port-gellhorn",
    name: "Port Gellhorn",
    type: "Location",
    summary: "Industrial Gulf coast town with a rougher tempo than Vice.",
    meta: "Town",
    image: "linear-gradient(135deg, #44403c, #a8a29e)",
  },
  {
    id: "l4",
    slug: "grassrivers",
    name: "Grassrivers",
    type: "Location",
    summary: "Swamp country — humidity, wildlife, and off-grid crime.",
    meta: "Wilderness",
    image: "linear-gradient(135deg, #14532d, #86efac)",
  },
];

export const leaks: Article[] = [
  {
    id: "lk1",
    slug: "map-size-claims-ranked",
    title: "Map Size Claims, Ranked by Credibility",
    excerpt: "We separate trailer evidence from anonymous forum math.",
    category: "Leak",
    date: "Mar 6, 2026",
    image: "linear-gradient(135deg, #450a0a, #f87171)",
    imageAlt: "Map abstract",
    imageCredit: "Image credit: Rockstar Games",
    tag: "Verified context",
  },
  {
    id: "lk2",
    slug: "animal-roster-rumors",
    title: "Animal Roster Rumors vs Trailer Evidence",
    excerpt: "Alligators are real. Everything else needs receipts.",
    category: "Leak",
    date: "Mar 4, 2026",
    image: "linear-gradient(135deg, #365314, #bef264)",
    imageAlt: "Wildlife abstract",
    imageCredit: "Image credit: Rockstar Games",
  },
  {
    id: "lk3",
    slug: "wanted-system-overhaul",
    title: "Wanted System Overhaul: What’s Plausible",
    excerpt: "Cops, heat, and why GTA 6 may feel closer to older entries.",
    category: "Leak",
    date: "Feb 28, 2026",
    image: "linear-gradient(135deg, #1e3a8a, #93c5fd)",
    imageAlt: "Siren lights abstract",
    imageCredit: "Image credit: Rockstar Games",
  },
  {
    id: "lk4",
    slug: "ai-pedestrians-claims",
    title: "AI Pedestrian Claims — Hype Check",
    excerpt: "Smarter crowds are coming. Sentient NPCs are not.",
    category: "Leak",
    date: "Feb 22, 2026",
    image: "linear-gradient(135deg, #4c1d95, #e9d5ff)",
    imageAlt: "Crowd abstract",
    imageCredit: "Image credit: Rockstar Games",
  },
];

export function getNewsArticles(): Article[] {
  const bySlug = new Map<string, Article>();
  for (const article of [...featuredSlides, ...latestNews]) {
    bySlug.set(article.slug, article);
  }
  return [...bySlug.values()];
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getNewsArticles().find((article) => article.slug === slug);
}

export function getRelatedArticles(article: Article, limit = 3): Article[] {
  return getNewsArticles()
    .filter((item) => item.slug !== article.slug)
    .slice(0, limit);
}
