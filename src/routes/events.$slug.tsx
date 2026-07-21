import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, Calendar, Clock, MapPin, Users } from "lucide-react";
import { eventBySlug } from "@/data/events";
import { RsvpDialog } from "@/components/site/RsvpDialog";
import { DevRsvpToggle } from "@/components/site/DevRsvpToggle";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/events/$slug")({
  loader: ({ params }) => {
    const event = eventBySlug(params.slug);
    if (!event) throw notFound();
    return { event };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Event not found — The Hub Social" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    return {
      meta: [
        { title: `${loaderData.event.title} — The Hub Social` },
        { name: "description", content: loaderData.event.description },
        { property: "og:title", content: loaderData.event.title },
        { property: "og:description", content: loaderData.event.description },
        { property: "og:image", content: loaderData.event.image },
        { property: "og:url", content: `/events/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/events/${params.slug}` }],
    };
  },
  component: EventDetail,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="font-display text-3xl font-bold">Event not found</h1>
      <Link to="/events" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
        <ArrowLeft className="size-4" /> Back to events
      </Link>
    </div>
  ),
});

type Attendee = { name: string; guests: number; created_at: string };

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase() ?? "")
    .join("");
}

const AVATAR_COLORS = [
  "bg-primary/15 text-primary",
  "bg-accent/20 text-accent-foreground",
  "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  "bg-fuchsia-500/15 text-fuchsia-700 dark:text-fuchsia-300",
  "bg-sky-500/15 text-sky-700 dark:text-sky-300",
  "bg-amber-500/20 text-amber-800 dark:text-amber-300",
];

function EventDetail() {
  const { event } = Route.useLoaderData();
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [loadingAttendees, setLoadingAttendees] = useState(true);
  const d = new Date(event.date);
  const nice = d.toLocaleDateString("en-ZA", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  const loadAttendees = useCallback(async () => {
    const { data, error } = await supabase.rpc("get_event_attendees", { _event_slug: event.slug });
    if (!error && data) setAttendees(data as Attendee[]);
    setLoadingAttendees(false);
  }, [event.slug]);

  useEffect(() => {
    loadAttendees();
  }, [loadAttendees]);

  const totalGuests = attendees.reduce((n, a) => n + (a.guests || 1), 0);

  const mapQuery = encodeURIComponent(event.location + ", Vaal Triangle, South Africa");

  return (
    <div className="pb-20">
      <section className="px-3 pt-4 sm:px-4">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-foreground sm:rounded-[40px]">
          <img src={event.image} alt={event.title} className="absolute inset-0 h-full w-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 to-foreground/85" />
          <div className="relative flex min-h-[460px] flex-col justify-end p-8 text-white sm:p-14">
            <Link to="/events" className="mb-6 inline-flex w-fit items-center gap-2 text-sm text-white/80 hover:text-white">
              <ArrowLeft className="size-4" /> All events
            </Link>
            <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent backdrop-blur w-fit">
              {event.category}
            </span>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold text-balance sm:text-5xl md:text-6xl">
              {event.title}
            </h1>
            <div className="mt-6 flex flex-wrap gap-6 text-white/85">
              <span className="flex items-center gap-2"><Calendar className="size-4" /> {nice}</span>
              <span className="flex items-center gap-2"><Clock className="size-4" /> {event.time}</span>
              <span className="flex items-center gap-2"><MapPin className="size-4" /> {event.location}</span>
              <span className="flex items-center gap-2"><Users className="size-4" /> {event.attending} attending</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 grid max-w-6xl gap-10 px-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="font-display text-2xl font-bold">About this event</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{event.description}</p>
          </div>

          <div>
            <div className="flex items-end justify-between">
              <h3 className="font-display text-xl font-bold">
                Who's coming{" "}
                {!loadingAttendees && (
                  <span className="text-muted-foreground font-normal">
                    · {totalGuests} {totalGuests === 1 ? "guest" : "guests"}
                  </span>
                )}
              </h3>
            </div>
            {loadingAttendees ? (
              <div className="mt-4 flex gap-3">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="size-12 animate-pulse rounded-full bg-muted" />
                ))}
              </div>
            ) : attendees.length === 0 ? (
              <p className="mt-4 text-muted-foreground">
                Be the first to RSVP — your name will show up here.
              </p>
            ) : (
              <>
                <div className="mt-4 flex flex-wrap -space-x-2">
                  {attendees.slice(0, 12).map((a, i) => (
                    <div
                      key={i}
                      title={`${a.name}${a.guests > 1 ? ` (+${a.guests - 1})` : ""}`}
                      className={`flex size-12 items-center justify-center rounded-full border-2 border-background text-sm font-bold ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}
                    >
                      {initials(a.name)}
                    </div>
                  ))}
                  {attendees.length > 12 && (
                    <div className="flex size-12 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-bold text-muted-foreground">
                      +{attendees.length - 12}
                    </div>
                  )}
                </div>
                <ul className="mt-6 divide-y divide-foreground/5 rounded-3xl border border-foreground/5 bg-card">
                  {attendees.map((a, i) => (
                    <li key={i} className="flex items-center gap-4 px-5 py-3">
                      <div
                        className={`flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-bold ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}
                      >
                        {initials(a.name)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-semibold">{a.name}</div>
                        <div className="text-xs text-muted-foreground">
                          RSVP'd {new Date(a.created_at).toLocaleDateString("en-ZA", { month: "short", day: "numeric" })}
                        </div>
                      </div>
                      {a.guests > 1 && (
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                          +{a.guests - 1} guest{a.guests - 1 === 1 ? "" : "s"}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <div>
            <h3 className="font-display text-xl font-bold">Location</h3>
            <div className="mt-4 overflow-hidden rounded-3xl border border-foreground/5">
              <iframe
                title="Event location"
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                className="h-80 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-3xl border border-foreground/5 bg-card p-6">
            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              When
            </div>
            <div className="mt-1 font-semibold">{nice} · {event.time}</div>
          </div>
          <div className="rounded-3xl border border-foreground/5 bg-card p-6">
            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Where</div>
            <div className="mt-1 font-semibold">{event.location}</div>
          </div>
          <button
            onClick={() => setRsvpOpen(true)}
            className="w-full rounded-3xl bg-primary p-5 text-center font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary-hover"
          >
            RSVP
          </button>
        </aside>
      </section>

      <RsvpDialog
        open={rsvpOpen}
        onClose={() => setRsvpOpen(false)}
        eventSlug={event.slug}
        eventTitle={event.title}
        onSuccess={loadAttendees}
      />

      <DevRsvpToggle slug={event.slug} onChanged={loadAttendees} />
    </div>
  );
}
