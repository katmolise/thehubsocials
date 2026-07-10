import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, Clock } from "lucide-react";
import type { EventItem } from "@/data/events";

function fmtDate(iso: string) {
  const d = new Date(iso);
  return {
    day: d.getDate().toString().padStart(2, "0"),
    month: d.toLocaleString("en-ZA", { month: "short" }).toUpperCase(),
  };
}

export function EventCard({ event, index = 0 }: { event: EventItem; index?: number }) {
  const { day, month } = fmtDate(event.date);
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group grid grid-cols-[auto_1fr] items-center gap-5 rounded-3xl border border-foreground/5 bg-card p-5 transition-colors hover:bg-muted/50 sm:grid-cols-[auto_1fr_auto] sm:gap-6 sm:p-6"
    >
      <div className="text-center min-w-16">
        <div className="text-xs font-bold uppercase tracking-widest text-primary">{month}</div>
        <div className="font-display text-3xl font-bold">{day}</div>
      </div>
      <div className="min-w-0">
        <span className="text-[10px] font-bold uppercase tracking-widest text-accent">
          {event.category}
        </span>
        <h4 className="mt-1 truncate font-display text-lg font-bold sm:text-xl">{event.title}</h4>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5"><Clock className="size-3.5" /> {event.time}</span>
          <span className="flex items-center gap-1.5"><MapPin className="size-3.5" /> {event.location}</span>
        </div>
      </div>
      <Link
        to="/events/$slug"
        params={{ slug: event.slug }}
        className="col-span-2 rounded-full bg-foreground px-5 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-background transition-colors hover:bg-primary hover:text-primary-foreground sm:col-span-1"
      >
        RSVP
      </Link>
    </motion.div>
  );
}
