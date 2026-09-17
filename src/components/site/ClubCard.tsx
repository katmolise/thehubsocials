import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { Club } from "@/data/clubs";

export function ClubCard({ club, index = 0 }: { club: Club; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative overflow-hidden rounded-3xl border border-foreground/5 bg-card transition-all hover:shadow-2xl hover:shadow-primary/5 sm:rounded-[32px]"
    >
      <div className="relative aspect-video overflow-hidden bg-muted sm:aspect-[4/3]">
        <img
          src={club.image}
          alt={club.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="rounded-full bg-background/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary backdrop-blur-sm">
            {club.category}
          </span>
        </div>
        <div className="absolute top-4 right-4 grid size-11 place-items-center rounded-2xl bg-background/90 text-xl backdrop-blur-sm">
          {club.emoji}
        </div>
      </div>
      <div className="p-5 sm:p-7">
        <h3 className="font-display text-xl font-bold">{club.name}</h3>
        <p className="mt-1 text-xs font-medium uppercase tracking-widest text-primary">{club.schedule}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{club.tagline}</p>
        <div className="mt-5 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 sm:mt-6">
          <Link
            to="/clubs/$slug"
            params={{ slug: club.slug }}
            className="rounded-full bg-foreground px-4 py-2 text-xs font-bold uppercase tracking-wider text-background transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
          >
            Join Club
          </Link>
          <Link
            to="/clubs/$slug"
            params={{ slug: club.slug }}
            className="truncate text-right text-sm font-semibold text-primary transition-transform group-hover:translate-x-1"
          >
            Learn more →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
