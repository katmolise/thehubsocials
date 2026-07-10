import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Users,
  Activity,
  BookOpen,
  Handshake,
  Sparkles,
  HeartPulse,
  Compass,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { clubs } from "@/data/clubs";
import { events } from "@/data/events";
import { ClubCard } from "@/components/site/ClubCard";
import { EventCard } from "@/components/site/EventCard";
import { AnimatedStat } from "@/components/site/AnimatedStat";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Testimonials } from "@/components/site/Testimonials";

export const Route = createFileRoute("/")({
  component: Home,
});

const whyJoin = [
  { icon: Users, title: "Meet new friends", desc: "Real people, real conversations, real connections." },
  { icon: Activity, title: "Stay active", desc: "Weekly football, running crews and hikes." },
  { icon: BookOpen, title: "Learn new skills", desc: "From chess to photography — grow together." },
  { icon: Handshake, title: "Network", desc: "Founders, freelancers and creatives in one place." },
  { icon: Sparkles, title: "Discover hobbies", desc: "19+ clubs to explore across the Vaal." },
  { icon: HeartPulse, title: "Mental health", desc: "Community is the antidote to loneliness." },
  { icon: Compass, title: "Feel connected", desc: "A home for people who love where they live." },
];

function Home() {
  const featured = clubs.slice(0, 6);
  const upcoming = events.slice(0, 4);

  return (
    <div className="pb-20">
      {/* HERO */}
      <section className="px-3 pt-4 sm:px-4">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-foreground sm:rounded-[40px]">
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=2000&q=80"
            alt="Community gathering in the Vaal Triangle"
            className="absolute inset-0 h-full w-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/50 to-foreground/80" />
          <div className="relative flex min-h-[560px] flex-col items-center justify-center px-6 py-20 text-center sm:min-h-[640px] sm:py-28">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-md"
            >
              Vaal Triangle · South Africa
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-6 max-w-4xl font-display text-5xl font-bold tracking-tight text-white text-balance sm:text-6xl md:text-7xl lg:text-8xl"
            >
              Where <span className="text-primary">Community</span> Happens
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 max-w-2xl text-lg text-white/90 text-pretty sm:text-xl"
            >
              Meet amazing people through shared interests. Join clubs. Attend events. Create your own community.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-3"
            >
              <Link
                to="/clubs"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 font-semibold text-primary-foreground shadow-xl shadow-primary/30 transition-transform hover:scale-105"
              >
                Join Community
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/events"
                className="rounded-full border border-white/30 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20"
              >
                Upcoming Events
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="grid size-10 place-items-center rounded-full border border-white/30 text-white/80"
              >
                <ChevronDown className="size-4" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Stats */}
        <div className="mx-auto -mt-14 grid max-w-5xl grid-cols-2 gap-3 px-4 sm:-mt-16 sm:gap-4 md:grid-cols-4">
          <AnimatedStat value={24} suffix="+" label="Communities" />
          <AnimatedStat value={1240} suffix="+" label="Members" />
          <AnimatedStat value={210} suffix="+" label="Events Hosted" />
          <AnimatedStat value={45} suffix="+" label="Monthly Meetups" />
        </div>
      </section>

      {/* FEATURED CLUBS */}
      <section className="mx-auto mt-32 max-w-7xl px-6">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Featured Clubs"
            title="Find your tribe"
            subtitle="Six of our most active clubs. Nineteen more waiting for you."
          />
          <Link to="/clubs" className="text-sm font-semibold text-primary hover:underline">
            See all clubs →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((c, i) => (
            <ClubCard key={c.slug} club={c} index={i} />
          ))}
        </div>
      </section>

      {/* EVENTS TIMELINE */}
      <section className="mt-32 bg-foreground py-24 text-background">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Upcoming Events
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold text-balance sm:text-4xl md:text-5xl">
                Mark your calendar
              </h2>
              <p className="mt-4 text-background/70">
                From book club Mondays to the Call of Duty Cannabis Cup — there's something on almost every week.
              </p>
              <Link
                to="/events"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:bg-primary-hover"
              >
                Full calendar <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="space-y-4 lg:col-span-8">
              {upcoming.map((e, i) => (
                <motion.div
                  key={e.slug}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                >
                  <Link
                    to="/events/$slug"
                    params={{ slug: e.slug }}
                    className="block rounded-3xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-primary">
                          {new Date(e.date).toLocaleDateString("en-ZA", {
                            month: "short",
                            day: "2-digit",
                          })}{" "}
                          · {e.time}
                        </span>
                        <h4 className="mt-1 font-display text-lg font-bold sm:text-xl">{e.title}</h4>
                        <p className="mt-1 text-sm text-background/60">{e.location}</p>
                      </div>
                      <span className="shrink-0 rounded-full bg-white/10 px-3 py-1 text-xs">
                        {e.attending} going
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY JOIN */}
      <section className="mx-auto mt-32 max-w-7xl px-6">
        <SectionHeading
          eyebrow="Why Join"
          title="More than a social club"
          subtitle="The Hub is a network for growth, wellbeing and belonging."
          align="center"
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {whyJoin.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="rounded-3xl border border-foreground/5 bg-card p-6"
            >
              <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                <item.icon className="size-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mt-32">
        <Testimonials />
      </section>

      {/* CTA */}
      <section className="mx-auto mt-32 max-w-7xl px-6">
        <div className="overflow-hidden rounded-[40px] bg-primary p-10 text-primary-foreground sm:p-16 md:p-20">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="font-display text-3xl font-bold sm:text-4xl md:text-5xl">
                Can't find your club?
              </h2>
              <p className="mt-4 max-w-md text-primary-foreground/80">
                Start one. We'll help you set it up, promote it, and find your first members.
              </p>
            </div>
            <div className="md:justify-self-end">
              <Link
                to="/start-a-social"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-4 font-semibold text-background transition-colors hover:bg-background hover:text-foreground"
              >
                Start a Social <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
