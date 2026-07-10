import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — The Hub Social" },
      {
        name: "description",
        content: "Photo and video highlights from Hub Social clubs and events across the Vaal Triangle.",
      },
      { property: "og:title", content: "Gallery — The Hub Social" },
      { property: "og:description", content: "Photo and video highlights from The Hub Social." },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: Gallery,
});

const photos = [
  { src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80", h: "aspect-[3/4]", alt: "Community gathering" },
  { src: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&q=80", h: "aspect-square", alt: "Football match" },
  { src: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=80", h: "aspect-[4/5]", alt: "Hiking trail" },
  { src: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?auto=format&fit=crop&w=1200&q=80", h: "aspect-[3/4]", alt: "Book club" },
  { src: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1200&q=80", h: "aspect-square", alt: "Coffee meetup" },
  { src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80", h: "aspect-[4/5]", alt: "Gaming night" },
  { src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80", h: "aspect-[3/4]", alt: "Networking" },
  { src: "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&w=1200&q=80", h: "aspect-square", alt: "Trail run" },
  { src: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1200&q=80", h: "aspect-[3/4]", alt: "Community" },
  { src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80", h: "aspect-[4/5]", alt: "Music night" },
  { src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80", h: "aspect-square", alt: "Cars & coffee" },
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80", h: "aspect-[3/4]", alt: "Supper club" },
];

function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="pb-20">
      <section className="mx-auto max-w-7xl px-6 pt-12">
        <SectionHeading
          eyebrow="Gallery"
          title="Community, captured"
          subtitle="Highlights from clubs, events and everyday Hub moments."
          align="center"
        />
      </section>

      <section className="mx-auto mt-12 max-w-7xl px-6">
        <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
          {photos.map((p, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.03 }}
              onClick={() => setOpen(i)}
              className={`mb-4 block w-full overflow-hidden rounded-3xl bg-muted ${p.h} group relative`}
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </motion.button>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[70] grid place-items-center bg-black/90 p-4"
          >
            <button
              aria-label="Close"
              onClick={() => setOpen(null)}
              className="absolute right-6 top-6 grid size-11 place-items-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20"
            >
              <X className="size-5" />
            </button>
            <motion.img
              key={open}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={photos[open].src}
              alt={photos[open].alt}
              className="max-h-[85vh] max-w-[92vw] rounded-2xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
