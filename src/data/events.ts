export type EventItem = {
  slug: string;
  title: string;
  date: string; // ISO
  time: string;
  location: string;
  category: "Sports" | "Gaming" | "Networking" | "Outdoors" | "Education" | "Lifestyle";
  description: string;
  image: string;
  attending: number;
};

export const events: EventItem[] = [
  {
    slug: "book-club-october",
    title: "Book Club — October Pick",
    date: "2026-10-19",
    time: "14:00",
    location: "Waldrift Centre, Vereeniging",
    category: "Education",
    description: "This month we're reading a South African contemporary favorite. Newcomers welcome.",
    image: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?auto=format&fit=crop&w=1600&q=80",
    attending: 24,
  },
  {
    slug: "sunday-football-league",
    title: "Sunday Football League",
    date: "2026-10-25",
    time: "14:00",
    location: "Vaal University Grounds",
    category: "Sports",
    description: "Regular 7-a-side league fixtures. Turn up 15 min early to warm up.",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1600&q=80",
    attending: 41,
  },
  {
    slug: "monthly-hike-suikerbosrand",
    title: "Monthly Hike — Suikerbosrand",
    date: "2026-10-31",
    time: "06:00",
    location: "Suikerbosrand Nature Reserve",
    category: "Outdoors",
    description: "Moderate 8km hike followed by a picnic. Bring 2L water.",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1600&q=80",
    attending: 32,
  },
  {
    slug: "coffee-morning-november",
    title: "Coffee Morning — November",
    date: "2026-11-04",
    time: "10:00",
    location: "Local Roastery, Vanderbijlpark",
    category: "Networking",
    description: "Casual mid-week meetup for coffee, croissants and good chat.",
    image: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1600&q=80",
    attending: 18,
  },
  {
    slug: "community-braai",
    title: "Community Braai",
    date: "2026-11-14",
    time: "12:00",
    location: "Vaal River Bank Park",
    category: "Lifestyle",
    description: "The annual Hub Social braai. Bring meat, we bring the sides and the vibe.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1600&q=80",
    attending: 87,
  },
  {
    slug: "movie-night-november",
    title: "Movie Night — Cult Classics",
    date: "2026-11-20",
    time: "19:00",
    location: "The Hub HQ",
    category: "Lifestyle",
    description: "Popcorn included. Vote for the film on the members channel.",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=80",
    attending: 26,
  },
  {
    slug: "call-of-duty-cannabis-cup-2026",
    title: "Call of Duty Cannabis Cup",
    date: "2026-12-13",
    time: "14:00",
    location: "The Hub HQ, Vanderbijlpark",
    category: "Gaming",
    description:
      "Our flagship end-of-year gaming tournament. 16 teams. Cash prizes and bragging rights.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80",
    attending: 64,
  },
];

export const eventBySlug = (slug: string) => events.find((e) => e.slug === slug);
