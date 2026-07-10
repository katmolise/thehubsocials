import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Plus } from "lucide-react";
import { clubs } from "@/data/clubs";
import { ClubCard } from "@/components/site/ClubCard";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/clubs")({
  head: () => ({
    meta: [
      { title: "Community Clubs — The Hub Social" },
      {
        name: "description",
        content:
          "Explore 19+ community clubs across the Vaal Triangle — from Book Club and Sunday Football to Gaming, Photography and more.",
      },
      { property: "og:title", content: "Community Clubs — The Hub Social" },
      { property: "og:description", content: "Explore 19+ clubs, or start your own." },
      { property: "og:url", content: "/clubs" },
    ],
    links: [{ rel: "canonical", href: "/clubs" }],
  }),
  component: Clubs,
});

const categories = ["All", "Sports", "Leisure", "Business", "Creative", "Outdoors", "Tech", "Lifestyle", "Education"] as const;

function Clubs() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof categories)[number]>("All");

  const filtered = useMemo(() => {
    return clubs.filter((c) => {
      const matchesCat = cat === "All" || c.category === cat;
      const matchesQ =
        !q ||
        c.name.toLowerCase().includes(q.toLowerCase()) ||
        c.tagline.toLowerCase().includes(q.toLowerCase());
      return matchesCat && matchesQ;
    });
  }, [q, cat]);

  return (
    <div className="pb-20">
      <section className="mx-auto max-w-7xl px-6 pt-12">
        <SectionHeading
          eyebrow="Community Clubs"
          title="Find your people"
          subtitle="Every interest, every skill level, every corner of the Vaal Triangle."
        />

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search clubs..."
              className="w-full rounded-full border border-foreground/10 bg-card py-3 pl-11 pr-5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <Link
            to="/start-a-social"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background hover:bg-primary hover:text-primary-foreground"
          >
            <Plus className="size-4" /> Start Your Own Club
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                cat === c
                  ? "bg-foreground text-background"
                  : "border border-foreground/10 bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-7xl px-6">
        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-foreground/10 p-16 text-center text-muted-foreground">
            No clubs match that search — try a different filter.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c, i) => (
              <ClubCard key={c.slug} club={c} index={i} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
