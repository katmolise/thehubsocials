import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export function AnimatedStat({
  value,
  suffix = "",
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setCurrent(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="min-w-0 rounded-2xl border border-foreground/5 bg-card px-2 py-5 text-center shadow-md shadow-foreground/5 sm:rounded-3xl sm:p-6 sm:shadow-xl"
    >
      <div className="font-display text-2xl font-bold text-primary sm:text-4xl">
        {current.toLocaleString()}
        {suffix}
      </div>
      <div className="mt-1 text-[10px] font-medium uppercase leading-4 tracking-wider text-muted-foreground sm:text-xs sm:tracking-widest">
        {label}
      </div>
    </motion.div>
  );
}
