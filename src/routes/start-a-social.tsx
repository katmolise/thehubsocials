import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { z } from "zod";
import { Lightbulb, Users, Rocket } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/start-a-social")({
  head: () => ({
    meta: [
      { title: "Start a Social — The Hub Social" },
      {
        name: "description",
        content:
          "Have an idea for a new community club in the Vaal Triangle? Apply to launch it with our help.",
      },
      { property: "og:title", content: "Start a Social — The Hub Social" },
      { property: "og:description", content: "Apply to launch your own community club." },
      { property: "og:url", content: "/start-a-social" },
    ],
    links: [{ rel: "canonical", href: "/start-a-social" }],
  }),
  component: StartASocial,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please share your name").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(6, "Add a valid phone").max(30),
  clubName: z.string().trim().min(2, "Give your club a name").max(80),
  description: z.string().trim().min(20, "Tell us a bit more (20+ chars)").max(1000),
  day: z.string().trim().min(1, "Pick a preferred day").max(50),
  time: z.string().trim().min(1, "Pick a preferred time").max(50),
  expected: z.string().trim().min(1, "Estimate expected members").max(20),
});

const steps = [
  { icon: Lightbulb, title: "Submit Idea", desc: "Fill out the form. Two minutes, tops." },
  { icon: Users, title: "Meet Admin", desc: "We'll invite you in for a coffee chat." },
  { icon: Rocket, title: "Launch Club", desc: "We help you promote, launch and grow." },
];

function StartASocial() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    clubName: "",
    description: "",
    day: "",
    time: "",
    expected: "",
  });
  const [busy, setBusy] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setBusy(true);
    setTimeout(() => {
      toast.success("Application submitted! We'll be in touch within 48 hours.");
      setForm({ name: "", email: "", phone: "", clubName: "", description: "", day: "", time: "", expected: "" });
      setBusy(false);
    }, 600);
  };

  const field = (
    label: string,
    key: keyof typeof form,
    type: string = "text",
    placeholder?: string,
  ) => (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</span>
      <input
        type={type}
        value={form[key]}
        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-foreground/10 bg-card px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
      />
    </label>
  );

  return (
    <div className="pb-20">
      <section className="px-3 pt-4 sm:px-4">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-foreground sm:rounded-[40px]">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2000&q=80"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/30 to-foreground/85" />
          <div className="relative flex min-h-[400px] flex-col justify-end p-8 text-white sm:p-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Start a Social</span>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold text-balance sm:text-5xl md:text-6xl">
              Start Your Own Community
            </h1>
            <p className="mt-4 max-w-xl text-lg text-white/85">
              Have a passion no one else has organized around? We'll help you build it.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-5xl px-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-3xl border border-foreground/5 bg-card p-6"
            >
              <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                <s.icon className="size-5" />
              </div>
              <div className="mt-5 text-xs font-bold uppercase tracking-widest text-primary">Step {i + 1}</div>
              <h3 className="mt-1 font-display text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-3xl px-6">
        <SectionHeading eyebrow="Apply" title="Tell us about your club" align="center" />
        <form onSubmit={submit} className="mt-10 space-y-4 rounded-[32px] border border-foreground/5 bg-card p-6 sm:p-10">
          <div className="grid gap-4 sm:grid-cols-2">
            {field("Your name", "name", "text", "Jane Doe")}
            {field("Email", "email", "email", "you@example.com")}
            {field("Phone", "phone", "tel", "+27 82 000 0000")}
            {field("Club name", "clubName", "text", "e.g. Vaal Cycling Crew")}
          </div>
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-muted-foreground">Description</span>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="What is your club about? Who is it for?"
              rows={5}
              className="w-full rounded-2xl border border-foreground/10 bg-background px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-3">
            {field("Preferred day", "day", "text", "Sundays")}
            {field("Preferred time", "time", "text", "09:00")}
            {field("Expected members", "expected", "text", "10-20")}
          </div>
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-full bg-primary py-4 text-sm font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary-hover disabled:opacity-60"
          >
            Submit Application
          </button>
        </form>
      </section>
    </div>
  );
}
