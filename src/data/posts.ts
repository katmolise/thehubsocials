export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: "Community Stories" | "Events" | "Book Reviews" | "Hiking Guides" | "Football" | "Gaming" | "Networking Tips";
  date: string;
  image: string;
  author: string;
};

export const posts: Post[] = [
  {
    slug: "why-community-matters",
    title: "Why Community Matters in the Vaal",
    excerpt: "How local clubs are quietly rebuilding social fabric in Vereeniging.",
    body: "Community isn't a nice-to-have — it's infrastructure. In this piece we look at how neighborhood-scale clubs are becoming the connective tissue of the Vaal Triangle...",
    category: "Community Stories",
    date: "2026-09-12",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=80",
    author: "The Hub Team",
  },
  {
    slug: "book-club-picks-2026",
    title: "Our 2026 Book Club Picks",
    excerpt: "Twelve books, twelve months, one community shelf.",
    body: "This year's rotation spans local voices, translated fiction and one classic per quarter. Here's the full list and why we picked each one.",
    category: "Book Reviews",
    date: "2026-08-30",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1600&q=80",
    author: "Book Club",
  },
  {
    slug: "beginner-hikes-vaal",
    title: "Five Beginner Hikes Around the Vaal",
    excerpt: "Short, scenic, and doable in a morning.",
    body: "New to hiking? Start here. Five trails ranked by distance, elevation and coffee-stop proximity.",
    category: "Hiking Guides",
    date: "2026-08-05",
    image: "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&w=1600&q=80",
    author: "Hub Hikes",
  },
  {
    slug: "football-recap-q3",
    title: "Sunday Football — Q3 Recap",
    excerpt: "Standings, MVPs and the outrageous own-goal of the season.",
    body: "Twelve weeks. Six teams. One league table. Here's how the season shook out.",
    category: "Football",
    date: "2026-07-28",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1600&q=80",
    author: "Football Club",
  },
  {
    slug: "gaming-tournament-recap",
    title: "How We Ran a 64-Player Tournament",
    excerpt: "Behind the scenes of our biggest gaming night yet.",
    body: "From bracket seeding to broadcast setup — everything we learned running our largest tournament to date.",
    category: "Gaming",
    date: "2026-07-14",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80",
    author: "Gaming Club",
  },
  {
    slug: "networking-tips-introverts",
    title: "Networking Tips for Introverts",
    excerpt: "How to work a room without becoming someone you're not.",
    body: "Networking doesn't have to mean small talk with strangers. Here are the plays that actually work for quieter members of the Hub.",
    category: "Networking Tips",
    date: "2026-06-30",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
    author: "Entrepreneur Hub",
  },
];

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);
