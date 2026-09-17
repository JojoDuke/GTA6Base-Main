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
  category: "News" | "Character" | "Vehicle" | "Location";
  date: string;
  image: string;
  imageAlt: string;
  imageCredit?: string;
  tag?: string;
  body?: ArticleBody;
};

export type EntityFact = {
  label: string;
  value: string;
};

export type EntitySection = {
  title: string;
  content: string;
};

export type Entity = {
  id: string;
  slug: string;
  name: string;
  type: "Character" | "Vehicle" | "Location";
  summary: string;
  meta: string;
  image: string;
  status: "Confirmed" | "Trailer" | "Rumored";
  facts: EntityFact[];
  sections: EntitySection[];
};

export const navLinks = [
  { href: "/news", label: "News" },
  { href: "/characters", label: "Characters" },
  { href: "/vehicles", label: "Vehicles" },
  { href: "/locations", label: "Locations" },
] as const;

export const utilityLinks = [
  { href: "/database", label: "Database" },
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
      "The important distinction is format: an extended in-game presentation can show pacing, environments, and character behavior that short promotional edits do not have time to establish. It still should not be treated as a complete feature list.",
      "Our follow-up coverage will separate directly shown details from interpretation. Named characters, visible locations, vehicles, interface elements, and platform information will be cross-referenced with Rockstar’s published material before being added to the database.",
      "Readers should also expect corrections as higher-resolution footage and official transcripts become available. A detail that is unclear in motion will remain described cautiously instead of being promoted as a confirmed mechanic.",
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
    image: "linear-gradient(135deg, #1a0a2e 0%, #ff2d6a 45%, #1896fe 100%)",
    imageAlt: "Neon Vice City skyline concept",
    imageCredit: "Source: Rockstar Games",
    tag: "Featured",
    body: [
      "Trailer 2 is the densest look yet at Leonida. Between neon Vice City blocks, gulf-coast industry, and backroad hideouts, Rockstar packed the cut with readable landmarks, vehicles, and story beats.",
      "We catalogued every clear location beat, character appearance, and vehicle silhouette — then cross-checked against Trailer 1 and official stills so this page stays grounded in what you can actually see.",
      "The location pass starts with broad visual anchors rather than guessed street names. Dense beachfront towers point toward Vice City, long bridge runs support the Leonida Keys, industrial waterfront imagery fits Port Gellhorn, and wetlands belong with the Grassrivers material.",
      "Vehicle identification requires more restraint. A familiar grille, body line, or manufacturer shape can narrow a model family, but motion blur and modified bodywork make exact variants difficult to prove. Entries stay at the strongest level the footage supports.",
      "Character scenes receive the same treatment. Dialogue, repeated pairings, and setting can support a story reading, but editing order does not prove that scenes happen chronologically in the finished game.",
      "That distinction matters because trailer breakdowns often turn plausible interpretation into certainty. Our database labels what is officially named, what is visibly present, and what remains an editorial reading.",
      "Use this as your living index. As new marketing drops, we’ll mark additions, corrections, and anything that was only a rumor the first time around.",
    ],
  },
  {
    id: "2",
    slug: "lucia-jason-what-we-know",
    title: "Lucia & Jason: What We Know About GTA 6’s Protagonists",
    excerpt:
      "Rockstar’s first female lead and her partner — confirmed details, casting rumors, and story hints so far.",
    category: "Character",
    date: "Mar 8, 2026",
    image: "linear-gradient(135deg, #0f172a 0%, #7c3aed 40%, #f97316 100%)",
    imageAlt: "Character silhouette concept",
    imageCredit: "Image credit: Rockstar Games",
    tag: "Deep Dive",
    body: [
      "Lucia is Rockstar’s first female GTA protagonist, and Jason is her partner in crime. Marketing has shown them as a couple operating across Leonida — heists, escapes, and messy personal loyalty included.",
      "The trailers frame their relationship as both personal and practical. They share quiet domestic moments as well as high-pressure criminal scenes, which makes the partnership more central than a simple mission-team pairing.",
      "What the marketing does not yet establish is the full structure around them: how control switches, how their individual histories unfold, and which supporting characters belong to each side of the story. Those questions remain open until Rockstar explains or demonstrates them.",
      "What’s confirmed comes from trailers and official copy. Casting chatter sits in a separate bucket and is labeled as such on our character pages.",
      "That separation is deliberate. A recognizable voice, an anonymous résumé, or a social-media theory can point researchers in a direction, but none is equivalent to a credit or statement from the publisher.",
      "The character database records official names, visible appearances, relationships supported by marketing, and clearly labeled notes. It avoids filling unknown biography fields with community consensus.",
      "If you’re new here, start with the Lucia and Jason database entries, then come back to this article for the narrative overview.",
    ],
  },
];

export const latestNews: Article[] = [
  {
    id: "n1",
    slug: "rockstar-job-listings-hint-online",
    title: "Rockstar Job Listings Hint at Ambitious Online Launch",
    excerpt:
      "Backend and live-ops roles suggest GTA Online 2 is already in heavy prep.",
    category: "News",
    date: "Mar 11, 2026",
    image: "linear-gradient(135deg, #111827, #1896fe)",
    imageAlt: "Abstract network graphic",
    imageCredit: "Image credit: Rockstar Games",
    body: [
      "Recent Rockstar job posts lean hard into live services, backend scale, and anti-cheat adjacent work — the kind of hiring pattern you expect before a long-lived online companion.",
      "None of that confirms a day-one GTA Online successor, but it does suggest Rockstar is staffing for persistence, not a single-player-only ship.",
      "Job listings are useful because they describe capabilities a studio wants, but they are weak evidence for a specific launch feature. A backend role can support an existing service, internal tools, another project, or work scheduled well after release.",
      "The strongest signals come from clusters rather than one title. Roles mentioning service reliability, deployment, account systems, telemetry, moderation, or anti-abuse work collectively describe operational priorities without revealing the final product design.",
      "For that reason, we avoid treating “GTA Online 2” as an official product name or promising a launch date. The listings support an online-services direction, not a complete mode announcement.",
      "We’ll keep a running log of listings that clearly map to online systems versus single-player production roles.",
    ],
  },
  {
    id: "n2",
    slug: "ps5-pro-enhancements-expected",
    title: "PS5 Pro Enhancements Expected at Launch",
    excerpt:
      "Higher fidelity targets and 60fps modes are the current industry bet.",
    category: "News",
    date: "Mar 10, 2026",
    image: "linear-gradient(135deg, #1e293b, #6366f1)",
    imageAlt: "Console silhouette",
    imageCredit: "Image credit: Rockstar Games",
    body: [
      "Industry expectation is that GTA 6 will ship with PS5 Pro-aware fidelity options — sharper images, better RT where it fits, and performance modes aimed at a stable 60fps.",
      "Rockstar has not published a mode sheet. Treat every “confirmed Pro patch” claim as unverified until an official tech blog or console store listing appears.",
      "Terms such as fidelity mode and performance mode describe priorities, not guaranteed specifications. Resolution, frame rate, ray tracing, crowd density, and image reconstruction can be balanced differently from one game to another.",
      "GTA 6 also presents an unusually demanding mix of open-world simulation and rendering. A more powerful GPU can improve image quality, while CPU-heavy systems such as traffic, physics, and world simulation may still shape frame-rate targets.",
      "That is why footage labels matter. A trailer captured on one console does not automatically document every retail mode, and video playback at 60 frames per second does not prove that the game itself was rendered at that rate.",
      "We will record platform claims only when Rockstar, Sony, or an official store page provides language that can be quoted and checked.",
      "We’ll update this page the moment platform pages or Rockstar Newswire spell out the real targets.",
    ],
  },
  {
    id: "n3",
    slug: "florida-inspiration-tour",
    title: "Florida Inspiration Tour: Real Places Behind Leonida",
    excerpt:
      "Miami, the Keys, and swamplands mapped against Trailer 2 frames.",
    category: "Location",
    date: "Mar 9, 2026",
    image: "linear-gradient(135deg, #134e4a, #f59e0b)",
    imageAlt: "Coastal landscape",
    imageCredit: "Image credit: Rockstar Games",
    body: [
      "Leonida is fiction, but Trailer 2 keeps rhyming with real Florida geography — Miami denseness for Vice City, island chains for the Keys, and humid wilderness for Grassrivers-style zones.",
      "This tour matches trailer frames to public reference photos and maps. It’s inspiration hunting, not a claim that every pixel is a 1:1 recreation.",
      "The most useful comparisons operate at the regional level. Skyline density, causeways, low-lying islands, wetlands, roadside development, and port infrastructure can explain the identity of a fictional area without assigning every building a real address.",
      "Vice City draws from the visual language of South Florida: vertical coastal development, bright nightlife, and roads pressed between water and dense neighborhoods. The Leonida Keys provide a different rhythm built around long crossings, small settlements, and boat access.",
      "Port Gellhorn and Grassrivers broaden that contrast. Industrial coast and wetland imagery give the map visual and gameplay spaces that do not depend on Vice City’s polished tourist identity.",
      "Trailer geography is edited for presentation, so adjacent shots may represent distant parts of the map. Until an official map is published, travel times and exact borders remain speculation.",
      "Jump into the location database for each named region once you’re done reading.",
    ],
  },
  {
    id: "n4",
    slug: "take-two-earnings-gta6",
    title: "Take-Two Earnings: What Management Said About GTA 6",
    excerpt:
      "Guidance language, marketing spend signals, and the autumn window.",
    category: "News",
    date: "Mar 7, 2026",
    image: "linear-gradient(135deg, #312e81, #22d3ee)",
    imageAlt: "Finance chart abstract",
    imageCredit: "Image credit: Rockstar Games",
    body: [
      "Earnings calls are where Take-Two’s GTA 6 language gets the most precise — and the most carefully lawyered. We pull the quotes that matter and ignore the hype cycle around them.",
      "Watch for shifts in fiscal year framing, marketing spend commentary, and whether the autumn window is restated without hedging.",
      "These calls are primarily for investors, not game reveals. Executives discuss release timing, financial expectations, risk, and portfolio strategy while avoiding the feature detail normally reserved for Rockstar’s own marketing.",
      "Exact wording matters. Repeating a previously announced window is different from narrowing it, and a broad statement about confidence is not the same as an irreversible guarantee.",
      "Financial guidance can provide context because a major release affects expected bookings and spending, but it cannot reveal every operational decision behind a schedule. Dates can still move after a call.",
      "Our summaries distinguish direct quotations, management guidance, and our interpretation. We do not turn share-price movement or analyst speculation into a Rockstar announcement.",
      "This page will get a fresh quote block after every relevant call or filing.",
    ],
  },
];

export const characters: Entity[] = [
  {
    id: "c1",
    slug: "lucia",
    name: "Lucia",
    type: "Character",
    summary:
      "GTA’s first female protagonist — sharp, resourceful, and central to the heist life.",
    meta: "Protagonist",
    image: "linear-gradient(135deg, #831843, #fb7185)",
    status: "Confirmed",
    facts: [
      { label: "Role", value: "Protagonist" },
      { label: "Partner", value: "Jason" },
      { label: "First shown", value: "Trailer 1" },
      { label: "Setting", value: "Leonida" },
    ],
    sections: [
      {
        title: "Overview",
        content:
          "Lucia is one of two playable leads in Grand Theft Auto VI. Official marketing frames her as capable, street-smart, and tightly bound to Jason’s orbit — a partnership that drives both crime and conflict.",
      },
      {
        title: "Appearances",
        content:
          "Featured heavily in Trailer 1 and Trailer 2, including dialogue beats, chase sequences, and quieter character moments that hint at a longer relationship history.",
      },
      {
        title: "Notes",
        content:
          "Casting rumors circulate often. GTA6Base only lists performer claims when they are backed by Rockstar, Take-Two, or major reporting with clear sourcing.",
      },
    ],
  },
  {
    id: "c2",
    slug: "jason",
    name: "Jason",
    type: "Character",
    summary:
      "Lucia’s partner in crime. Calm under pressure with a southern edge.",
    meta: "Protagonist",
    image: "linear-gradient(135deg, #1e3a5f, #38bdf8)",
    status: "Confirmed",
    facts: [
      { label: "Role", value: "Protagonist" },
      { label: "Partner", value: "Lucia" },
      { label: "First shown", value: "Trailer 1" },
      { label: "Tone", value: "Southern / grounded" },
    ],
    sections: [
      {
        title: "Overview",
        content:
          "Jason shares the spotlight with Lucia. Trailer material shows him as steadier on the surface — the logistics mind to Lucia’s sharper edge — though neither character reads as a simple archetype.",
      },
      {
        title: "Appearances",
        content:
          "Present across major trailer sequences: robberies, escapes, and downtime that sells the couple as a unit rather than two unrelated leads.",
      },
      {
        title: "Notes",
        content:
          "Associated names like Cal Hampton appear in surrounding chatter. Those connections stay marked separately until Rockstar confirms them in-game or in marketing.",
      },
    ],
  },
  {
    id: "c3",
    slug: "boobie-ike",
    name: "Boobie Ike",
    type: "Character",
    summary:
      "Vice City personality spotted in marketing — local fame meets street politics.",
    meta: "Supporting",
    image: "linear-gradient(135deg, #713f12, #fbbf24)",
    status: "Trailer",
    facts: [
      { label: "Role", value: "Supporting" },
      { label: "Region", value: "Vice City" },
      { label: "Vibe", value: "Local celebrity" },
      { label: "Status", value: "Seen in marketing" },
    ],
    sections: [
      {
        title: "Overview",
        content:
          "Boobie Ike reads as a Vice City personality — the kind of local fame that can open doors or create enemies depending on the scene.",
      },
      {
        title: "Appearances",
        content:
          "Spotted in promotional material tied to Vice’s nightlife and street culture. Full story role is still being pieced together.",
      },
      {
        title: "Notes",
        content:
          "Treat extended backstory posts on social media as unverified unless they cite trailer evidence or official copy.",
      },
    ],
  },
  {
    id: "c4",
    slug: "cal-hampton",
    name: "Cal Hampton",
    type: "Character",
    summary:
      "Associated with Jason’s circle — details still being pieced together.",
    meta: "Supporting",
    image: "linear-gradient(135deg, #365314, #a3e635)",
    status: "Rumored",
    facts: [
      { label: "Role", value: "Supporting (alleged)" },
      { label: "Link", value: "Jason’s circle" },
      { label: "Evidence", value: "Limited / mixed" },
      { label: "Status", value: "Needs receipts" },
    ],
    sections: [
      {
        title: "Overview",
        content:
          "Cal Hampton appears in community databases as part of Jason’s wider circle. Public trailer confirmation is thinner than for Lucia and Jason themselves.",
      },
      {
        title: "Appearances",
        content:
          "Mentioned in community discussions more than in polished marketing. We keep this entry for tracking — not as a hard confirmation.",
      },
      {
        title: "Notes",
        content:
          "If Rockstar shows Cal clearly in a future trailer or screenshot pack, this status upgrades from Rumored to Trailer or Confirmed.",
      },
    ],
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
    status: "Trailer",
    facts: [
      { label: "Class", value: "Sports" },
      { label: "Manufacturer", value: "Invetero" },
      { label: "Setting", value: "Leonida highways" },
      { label: "Evidence", value: "Trailer / stills" },
    ],
    sections: [
      {
        title: "Overview",
        content:
          "The Coquette line returns with a sharper Leonida-era cut. Expect it to show up in chase footage and beachfront cruising shots alike.",
      },
      {
        title: "Design notes",
        content:
          "Low profile, long hood energy, and lighting that reads clearly even in short trailer cuts. Exact in-game performance stats are unknown.",
      },
    ],
  },
  {
    id: "v2",
    slug: "declasse-tampa",
    name: "Declasse Tampa GT",
    type: "Vehicle",
    summary: "Muscle energy built for coastal cruising and quick getaways.",
    meta: "Muscle",
    image: "linear-gradient(135deg, #1e293b, #94a3b8)",
    status: "Trailer",
    facts: [
      { label: "Class", value: "Muscle" },
      { label: "Manufacturer", value: "Declasse" },
      { label: "Use case", value: "Street / getaway" },
      { label: "Evidence", value: "Trailer" },
    ],
    sections: [
      {
        title: "Overview",
        content:
          "A muscle silhouette that fits Leonida’s mix of boulevard flex and sudden violence. Tampa variants have a long GTA history; this one looks tuned for the new map.",
      },
      {
        title: "Design notes",
        content:
          "Broad stance, aggressive lighting, and a profile that stands out in night footage. Customization depth is TBD.",
      },
    ],
  },
  {
    id: "v3",
    slug: "pegassi-torero",
    name: "Pegassi Torero XO",
    type: "Vehicle",
    summary: "Supercar presence teased across multiple trailer cuts.",
    meta: "Super",
    image: "linear-gradient(135deg, #312e81, #c4b5fd)",
    status: "Trailer",
    facts: [
      { label: "Class", value: "Super" },
      { label: "Manufacturer", value: "Pegassi" },
      { label: "Presence", value: "Multiple cuts" },
      { label: "Evidence", value: "Trailer" },
    ],
    sections: [
      {
        title: "Overview",
        content:
          "Pegassi’s exotic language is back — low, wide, and built to sell wealth on Vice’s brighter streets.",
      },
      {
        title: "Design notes",
        content:
          "Hard to miss in motion blur. We’ll lock a cleaner gallery once higher-resolution stills are public.",
      },
    ],
  },
  {
    id: "v4",
    slug: "boat-dinghy",
    name: "Coastal Dinghy",
    type: "Vehicle",
    summary: "Water escapes matter in a state built on islands and inlets.",
    meta: "Boat",
    image: "linear-gradient(135deg, #0e7490, #67e8f9)",
    status: "Trailer",
    facts: [
      { label: "Class", value: "Boat" },
      { label: "Role", value: "Coastal transit / escape" },
      { label: "Map fit", value: "Keys / inlets" },
      { label: "Evidence", value: "Trailer" },
    ],
    sections: [
      {
        title: "Overview",
        content:
          "Leonida’s waterways are not decoration. Small boats show up because the fantasy needs crossings, hideouts, and wet getaways.",
      },
      {
        title: "Design notes",
        content:
          "Utility first. Exact handling and custom options will wait for gameplay footage.",
      },
    ],
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
    status: "Confirmed",
    facts: [
      { label: "Type", value: "City" },
      { label: "Region", value: "Leonida" },
      { label: "Inspiration", value: "Miami-area density" },
      { label: "First shown", value: "Trailer 1" },
    ],
    sections: [
      {
        title: "Overview",
        content:
          "Vice City is the neon spine of Leonida — beaches, towers, nightlife, and the cultural heat that sells the state’s fantasy.",
      },
      {
        title: "What we’ve seen",
        content:
          "Trailer footage emphasizes strip lighting, waterfront roads, and vertical density. Expect it to anchor a large share of story and free roam marketing.",
      },
    ],
  },
  {
    id: "l2",
    slug: "leonida-keys",
    name: "Leonida Keys",
    type: "Location",
    summary: "Island chain energy — boats, bridges, and hideouts.",
    meta: "Region",
    image: "linear-gradient(135deg, #115e59, #fde68a)",
    status: "Confirmed",
    facts: [
      { label: "Type", value: "Region" },
      { label: "Terrain", value: "Islands / bridges" },
      { label: "Travel", value: "Cars + boats" },
      { label: "Evidence", value: "Trailers" },
    ],
    sections: [
      {
        title: "Overview",
        content:
          "The Keys stretch Leonida into water — crossings, quiet docks, and the kind of isolation that fits both vacation postcards and criminal logistics.",
      },
      {
        title: "What we’ve seen",
        content:
          "Bridge runs and coastal cuts appear across marketing. Exact settlement names will fill in as Rockstar publishes more.",
      },
    ],
  },
  {
    id: "l3",
    slug: "port-gellhorn",
    name: "Port Gellhorn",
    type: "Location",
    summary: "Industrial Gulf coast town with a rougher tempo than Vice.",
    meta: "Town",
    image: "linear-gradient(135deg, #44403c, #a8a29e)",
    status: "Trailer",
    facts: [
      { label: "Type", value: "Town" },
      { label: "Tone", value: "Industrial / Gulf" },
      { label: "Contrast", value: "Vs Vice City gloss" },
      { label: "Evidence", value: "Trailer / stills" },
    ],
    sections: [
      {
        title: "Overview",
        content:
          "Port Gellhorn is the working-coast counterweight to Vice’s postcard neon — warehouses, grit, and a slower, heavier mood.",
      },
      {
        title: "What we’ve seen",
        content:
          "Industrial silhouettes and gulf-town framing. Story importance is still being mapped from trailer geography.",
      },
    ],
  },
  {
    id: "l4",
    slug: "grassrivers",
    name: "Grassrivers",
    type: "Location",
    summary: "Swamp country — humidity, wildlife, and off-grid crime.",
    meta: "Wilderness",
    image: "linear-gradient(135deg, #14532d, #86efac)",
    status: "Trailer",
    facts: [
      { label: "Type", value: "Wilderness" },
      { label: "Terrain", value: "Swamp / wetlands" },
      { label: "Threats", value: "Wildlife + isolation" },
      { label: "Evidence", value: "Trailer" },
    ],
    sections: [
      {
        title: "Overview",
        content:
          "Grassrivers is Leonida’s humid wild card — the place where asphalt thinness and wildlife make every escape feel different from city chases.",
      },
      {
        title: "What we’ve seen",
        content:
          "Wetland shots and off-road tension. Animal claims beyond trailer evidence stay off this page until they’re shown officially.",
      },
    ],
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

export function getEntityBySlug(
  type: Entity["type"],
  slug: string,
): Entity | undefined {
  const list =
    type === "Character"
      ? characters
      : type === "Vehicle"
        ? vehicles
        : locations;
  return list.find((entity) => entity.slug === slug);
}

export function getEntityPath(entity: Entity): string {
  const base =
    entity.type === "Character"
      ? "characters"
      : entity.type === "Vehicle"
        ? "vehicles"
        : "locations";
  return `/${base}/${entity.slug}`;
}

export function getArticlePath(article: Article): string {
  return `/news/${article.slug}`;
}

export function getRelatedArticles(article: Article, limit = 3): Article[] {
  return getNewsArticles()
    .filter((item) => item.slug !== article.slug)
    .slice(0, limit);
}

export function getRelatedEntities(entity: Entity, limit = 3): Entity[] {
  const pool =
    entity.type === "Character"
      ? characters
      : entity.type === "Vehicle"
        ? vehicles
        : locations;
  return pool.filter((item) => item.slug !== entity.slug).slice(0, limit);
}
