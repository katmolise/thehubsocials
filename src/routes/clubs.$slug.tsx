import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Users } from "lucide-react";
import { toast } from "sonner";
import { clubBySlug, clubs } from "@/data/clubs";

export const Route = createFileRoute("/clubs/$slug")({
  loader: ({ params }) => {
    const club = clubBySlug(params.slug);
    if (!club) throw notFound();
    return { club };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Club not found — The Hub Social" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    return {
      meta: [
        { title: `${loaderData.club.name} — The Hub Social` },
        { name: "description", content: loaderData.club.tagline },
        { property: "og:title", content: `${loaderData.club.name} — The Hub Social` },
        { property: "og:description", content: loaderData.club.tagline },
        { property: "og:image", content: loaderData.club.image },
        { property: "og:url", content: `/clubs/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/clubs/${params.slug}` }],
    };
  },
  component: ClubDetail,
  notFoundComponent: ClubNotFound,
});

function ClubNotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="font-display text-3xl font-bold">Club not found</h1>
      <p className="mt-3 text-muted-foreground">This club may have moved or been renamed.</p>
      <Link
        to="/clubs"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
      >
        <ArrowLeft className="size-4" /> Back to all clubs
      </Link>
    </div>
  );
}

function ClubDetail() {
  const { club } = Route.useLoaderData();
  const related = clubs.filter((c) => c.category === club.category && c.slug !== club.slug).slice(0, 3);

  return (
    <div className="pb-20">
      <section className="px-3 pt-4 sm:px-4">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-foreground sm:rounded-[40px]">
          <img src={club.image} alt={club.name} className="absolute inset-0 h-full w-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/30 to-foreground/85" />
          <div className="relative flex min-h-[420px] flex-col justify-end p-8 text-white sm:p-14">
            <Link to="/clubs" className="mb-6 inline-flex w-fit items-center gap-2 text-sm text-white/80 hover:text-white">
              <ArrowLeft className="size-4" /> All clubs
            </Link>
            <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary backdrop-blur w-fit">
              {club.category}
            </span>
            <h1 className="mt-4 flex items-center gap-4 font-display text-4xl font-bold sm:text-5xl md:text-6xl">
              <span className="text-3xl sm:text-4xl">{club.emoji}</span>
              {club.name}
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-white/85">{club.tagline}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 grid max-w-6xl gap-10 px-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="font-display text-2xl font-bold">About this club</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{club.description}</p>

          {club.gallery.length > 0 && (
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {club.gallery.map((g: string, i: number) => (
                <img key={i} src={g} alt="" className="aspect-[4/3] w-full rounded-3xl object-cover" />
              ))}
            </div>
          )}
        </div>

        <aside className="space-y-4">
          <div className="rounded-3xl border border-foreground/5 bg-card p-6">
            <div className="flex items-start gap-3">
              <Calendar className="mt-0.5 size-5 text-primary" />
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Schedule
                </div>
                <div className="mt-1 font-semibold">{club.schedule}</div>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-foreground/5 bg-card p-6">
            <div className="flex items-start gap-3">
              <Users className="mt-0.5 size-5 text-primary" />
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Members
                </div>
                <div className="mt-1 font-semibold">{club.members} active</div>
              </div>
            </div>
          </div>
          <button
            onClick={() => toast.success(`Welcome to ${club.name}! We'll be in touch.`)}
            className="w-full rounded-3xl bg-primary p-5 text-center font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary-hover"
          >
            Join {club.name}
          </button>
        </aside>
      </section>

      {related.length > 0 && (
        <section className="mx-auto mt-24 max-w-6xl px-6">
          <h3 className="font-display text-2xl font-bold">You might also like</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                to="/clubs/$slug"
                params={{ slug: r.slug }}
                className="group flex items-center gap-4 rounded-3xl border border-foreground/5 bg-card p-4 transition-colors hover:bg-muted/50"
              >
                <img src={r.image} alt={r.name} className="size-16 shrink-0 rounded-2xl object-cover" />
                <div className="min-w-0">
                  <div className="truncate font-display font-bold">{r.name}</div>
                  <div className="truncate text-xs text-muted-foreground">{r.schedule}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
