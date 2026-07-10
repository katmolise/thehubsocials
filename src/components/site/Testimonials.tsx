import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  const [i, setI] = useState(0);
  const t = testimonials[i];
  const next = () => setI((v) => (v + 1) % testimonials.length);
  const prev = () => setI((v) => (v - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="mx-auto max-w-7xl px-6">
      <div className="relative overflow-hidden rounded-[40px] bg-primary/5 p-8 sm:p-12 md:p-20">
        <div className="absolute -top-24 -right-24 size-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative">
          <div className="mb-6 flex items-center gap-1 text-accent">
            {Array.from({ length: 5 }).map((_, k) => (
              <Star key={k} className="size-4 fill-current" />
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="font-display text-xl font-medium leading-tight italic text-foreground sm:text-2xl md:text-3xl"
            >
              “{t.quote}”
            </motion.blockquote>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="grid size-12 place-items-center rounded-full bg-primary/20 font-display font-bold text-primary">
                {t.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              <div>
                <div className="font-bold">{t.name}</div>
                <div className="text-sm text-muted-foreground">{t.role}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="grid size-11 place-items-center rounded-full border border-foreground/10 bg-background transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                onClick={next}
                aria-label="Next testimonial"
                className="grid size-11 place-items-center rounded-full border border-foreground/10 bg-background transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
