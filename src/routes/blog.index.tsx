import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { posts } from "@/data/posts";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — The Hub Social" },
      {
        name: "description",
        content: "Community stories, event recaps, book reviews, hiking guides, football results and networking tips.",
      },
      { property: "og:title", content: "Blog — The Hub Social" },
      { property: "og:description", content: "Community stories and guides from The Hub Social." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: Blog,
});

const categories = ["All", "Community Stories", "Events", "Book Reviews", "Hiking Guides", "Football", "Gaming", "Networking Tips"] as const;

function Blog() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const filtered = useMemo(() => (cat === "All" ? posts : posts.filter((p) => p.category === cat)), [cat]);

  return (
    <div className="pb-20">
      <section className="mx-auto max-w-7xl px-6 pt-12">
        <SectionHeading
          eyebrow="The Journal"
          title="Stories from the community"
          subtitle="Recaps, reviews, guides — and the odd mildly opinionated essay."
        />
        <div className="mt-8 flex flex-wrap gap-2">
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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Link
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group block overflow-hidden rounded-[32px] border border-foreground/5 bg-card transition-all hover:shadow-2xl hover:shadow-primary/5"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">{p.category}</span>
                  <h3 className="mt-2 font-display text-xl font-bold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{p.author}</span>
                    <span>{new Date(p.date).toLocaleDateString("en-ZA", { month: "short", day: "numeric", year: "numeric" })}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-center gap-2">
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              className={`grid size-10 place-items-center rounded-full text-sm font-semibold ${
                n === 1 ? "bg-foreground text-background" : "border border-foreground/10 text-muted-foreground hover:text-foreground"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
