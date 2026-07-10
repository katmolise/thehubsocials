import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { events } from "@/data/events";
import { EventCard } from "@/components/site/EventCard";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — The Hub Social" },
      {
        name: "description",
        content:
          "Upcoming events across the Vaal Triangle — sports, gaming, networking, outdoors, education and lifestyle meetups.",
      },
      { property: "og:title", content: "Events — The Hub Social" },
      { property: "og:description", content: "Upcoming events across the Vaal Triangle." },
      { property: "og:url", content: "/events" },
    ],
    links: [{ rel: "canonical", href: "/events" }],
  }),
  component: Events,
});

const filters = ["All", "Sports", "Gaming", "Networking", "Outdoors", "Education", "Lifestyle"] as const;

function Events() {
  const [q, setQ] = useState("");
  const [f, setF] = useState<(typeof filters)[number]>("All");

  const filtered = useMemo(
    () =>
      events.filter((e) => {
        const matchesF = f === "All" || e.category === f;
        const matchesQ = !q || e.title.toLowerCase().includes(q.toLowerCase());
        return matchesF && matchesQ;
      }),
    [q, f],
  );

  return (
    <div className="pb-20">
      <section className="mx-auto max-w-7xl px-6 pt-12">
        <SectionHeading
          eyebrow="What's on"
          title="Upcoming events"
          subtitle="From weekly meetups to the Call of Duty Cannabis Cup."
        />

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search events..."
              className="w-full rounded-full border border-foreground/10 bg-card py-3 pl-11 pr-5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {filters.map((c) => (
            <button
              key={c}
              onClick={() => setF(c)}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                f === c
                  ? "bg-foreground text-background"
                  : "border border-foreground/10 bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-4xl space-y-4 px-6">
        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-foreground/10 p-16 text-center text-muted-foreground">
            No events match. Check back soon.
          </div>
        ) : (
          filtered.map((e, i) => <EventCard key={e.slug} event={e} index={i} />)
        )}
      </section>
    </div>
  );
}
