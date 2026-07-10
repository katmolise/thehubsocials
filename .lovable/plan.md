# The Hub Social — Build Plan

A premium, mobile-first community website for the Vaal Triangle, built on the project's TanStack Start + React + Tailwind v4 + TypeScript stack, with Framer Motion animations and Lucide icons. Static/placeholder content for v1, Unsplash imagery, no backend yet.

## Step 1 — Design directions (do first)

Generate 3 rendered HTML directions locked to the brief:
- Palette: primary `#22C55E`, dark `#0F172A`, bg `#F8FAFC`, accent `#F59E0B`, success `#16A34A`
- Fonts: Poppins (display) + Inter (body)
- Product: community hub landing (hero, stats, featured clubs, events, why-join, testimonials)

Three distinct points of view (composition/density/motion vary; tokens locked):
1. **Editorial Meetup** — magazine-grid clubs, oversized type, generous whitespace, warm human photography.
2. **Sport/Nike energetic** — bold diagonal hero, strong green accents, kinetic type, dense event ticker.
3. **Airbnb-soft premium** — rounded cards, glassmorphism, pastel-lit photography, calm rhythm.

You pick one → I implement it faithfully across all pages.

## Step 2 — Foundation

- Load Poppins + Inter via `<link>` in `__root.tsx`.
- Define brand tokens (colors, gradients, shadows) in `src/styles.css` under `@theme` + `:root`, including dark-mode variants.
- Global shell: sticky nav (with mobile drawer), footer with newsletter, floating WhatsApp button, scroll progress bar, back-to-top, dark-mode toggle, loading screen.
- SEO: unique `head()` per route (title, description, og:*, canonical); root sets sitewide defaults + Organization JSON-LD.

## Step 3 — Routes (all under `src/routes/`)

```
index.tsx                 Home
about.tsx                 About
clubs.tsx                 Community Clubs index
clubs.$slug.tsx           Individual club page
events.tsx                Events (calendar + filters)
events.$slug.tsx          Event detail (RSVP UI, map)
start-a-social.tsx        Application flow + form
gallery.tsx               Masonry + lightbox
blog.tsx                  Blog index (categories, pagination)
blog.$slug.tsx            Blog post
contact.tsx               Split map/form layout
```

## Step 4 — Page contents

- **Home**: full-bleed hero, animated counters (Communities/Members/Events/Monthly Meetups), 6 featured club cards (Book Club, Sunday Football, Hub Hikes, Gaming, Coffee Conversations, Entrepreneur Hub), events timeline, Why Join icon grid, testimonials carousel.
- **About**: hero image, mission/vision/values, history + future goals timeline.
- **Clubs index**: filterable grid of ~19 clubs from brief + "Start Your Own Club" CTA.
- **Club detail**: hero, description, schedule, gallery strip, join CTA.
- **Events**: month view + list, filters (Sports/Gaming/Networking/Outdoors/Education/Lifestyle), items from brief incl. "Call of Duty Cannabis Cup — Dec 2026".
- **Event detail**: description, gallery, embedded map placeholder, RSVP.
- **Start a Social**: 3-step process, application form (client-side zod validation, no submit backend yet — success toast).
- **Gallery**: Pinterest-style masonry with lightbox, photo/video tabs.
- **Blog**: card grid, categories, pagination (static posts).
- **Contact**: split layout — embedded Google Maps iframe (Waldrift Centre, Vereeniging), email `admin@thehubsocials.co.za`, WhatsApp button, YouTube/SoundCloud links, contact form (client-side only).

## Step 5 — Extras

Dark mode toggle, client-side search (clubs + events), sticky nav, floating WhatsApp, newsletter signup (UI only), Google Maps embed, Framer Motion entrance/hover animations, loading screen, scroll progress, back-to-top, per-route SEO metadata, keyboard-accessible components, responsive mobile → desktop.

## Technical notes

- Framework: TanStack Start (not Next.js) — routing via file-based `src/routes/`, `createFileRoute`, `<Link>`, `head()` per route.
- Data: all placeholder/static in `src/data/*.ts` (clubs, events, posts, testimonials).
- Components: shared `Header`, `Footer`, `ClubCard`, `EventCard`, `SectionHeading`, `Stat`, `TestimonialCarousel`, `Lightbox`, `WhatsAppFab`, `ScrollProgress`, `BackToTop`, `ThemeToggle`, `LoadingScreen`.
- Images: Unsplash URLs (community/sport/coffee/hiking themes) with proper `alt` text.
- No backend this pass — forms validate + toast. Adding Lovable Cloud (DB, auth, RSVPs, form submissions) can come next.

## Out of scope (v1)

Member login, dashboards, real event booking, memberships, rewards, QR check-in, notifications, mobile app — designed as visual placeholders only if surfaced.

## Deliverable

A polished, deployable multi-page site matching your chosen design direction, ready to swap in real content and (later) a backend.
