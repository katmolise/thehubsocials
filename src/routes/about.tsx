import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart, Target, Sparkles, Users } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — The Hub Social" },
      {
        name: "description",
        content:
          "The Hub Social exists to bring the Vaal Triangle together. Our mission, values, and vision for the community.",
      },
      { property: "og:title", content: "About — The Hub Social" },
      {
        property: "og:description",
        content: "Our mission, vision and values as the community hub of the Vaal Triangle.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const values = [
  { icon: Heart, title: "Welcoming", desc: "Every door is open. Every voice matters." },
  { icon: Users, title: "Community-first", desc: "We build for people, not metrics." },
  { icon: Sparkles, title: "Creative", desc: "We make room for wildly different interests." },
  { icon: Target, title: "Local", desc: "Rooted in the Vaal, growing across South Africa." },
];

const timeline = [
  { year: "2023", title: "The first Monday", desc: "Six friends. One book club. A coffee shop in Vereeniging." },
  { year: "2024", title: "Sunday Football kicks off", desc: "Twelve players become forty. A league is born." },
  { year: "2025", title: "The Hub HQ opens", desc: "A permanent home at Waldrift Centre." },
  { year: "2026", title: "1,000+ members", desc: "24 clubs. Weekly events. A real community." },
  { year: "2027", title: "Beyond the Vaal", desc: "Sasolburg, Meyerton, and eventually the country." },
];

function About() {
  return (
    <div className="pb-20">
      <section className="px-3 pt-4 sm:px-4">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-foreground sm:rounded-[40px]">
          <img
            src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=2000&q=80"
            alt="A community of friends"
            className="absolute inset-0 h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 to-foreground/80" />
          <div className="relative flex min-h-[440px] flex-col justify-end px-8 py-16 text-white sm:px-14 sm:py-20">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Our Story</span>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold text-balance sm:text-5xl md:text-6xl">
              A social hub for the Vaal Triangle
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/85">
              We started with one book club and a hunch that people in the Vaal wanted more real-world connection. Turns out they did.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-24 grid max-w-7xl gap-12 px-6 lg:grid-cols-3">
        {[
          { title: "Mission", body: "To bring people together through shared interests — from reading and football to entrepreneurship and gaming." },
          { title: "Vision", body: "To become the social hub of the Vaal Triangle, and then scale nationally across South Africa." },
          { title: "Values", body: "Warmth, curiosity, ownership, and craft. We show up for each other." },
        ].map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="rounded-3xl border border-foreground/5 bg-card p-8"
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{b.title}</span>
            <p className="mt-4 text-lg leading-relaxed">{b.body}</p>
          </motion.div>
        ))}
      </section>

      <section className="mx-auto mt-24 max-w-7xl px-6">
        <SectionHeading eyebrow="What we care about" title="Our values" align="center" />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-3xl border border-foreground/5 bg-card p-6"
            >
              <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                <v.icon className="size-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-4xl px-6">
        <SectionHeading eyebrow="Timeline" title="Where we came from, where we're headed" />
        <div className="relative mt-14 space-y-8 before:absolute before:left-4 before:top-2 before:bottom-2 before:w-px before:bg-foreground/10">
          {timeline.map((t, i) => (
            <motion.div
              key={t.year}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="relative pl-12"
            >
              <div className="absolute left-3 top-2 size-2.5 rounded-full bg-primary ring-4 ring-primary/20" />
              <span className="text-xs font-bold uppercase tracking-widest text-primary">{t.year}</span>
              <h4 className="mt-1 font-display text-xl font-bold">{t.title}</h4>
              <p className="mt-1 text-muted-foreground">{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
