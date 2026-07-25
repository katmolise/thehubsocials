import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Mail, MapPin, MessageCircle, Youtube, Music2 } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — The Hub Social" },
      {
        name: "description",
        content: "Get in touch with The Hub Social — Waldrift Centre, Vereeniging. Email, WhatsApp, YouTube and SoundCloud.",
      },
      { property: "og:title", content: "Contact — The Hub Social" },
      { property: "og:description", content: "Get in touch. Waldrift Centre, Vereeniging." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please share your name").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(10, "Add a bit more detail").max(1000),
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
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
      toast.success("Message sent — we'll reply within a day.");
      setForm({ name: "", email: "", message: "" });
      setBusy(false);
    }, 500);
  };

  return (
    <div className="pb-20">
      <section className="mx-auto max-w-7xl px-6 pt-12">
        <SectionHeading
          eyebrow="Contact"
          title="Say hello"
          subtitle="Questions, ideas, partnerships — we read every message."
        />
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-6">
        <div className="grid overflow-hidden rounded-[32px] border border-foreground/5 bg-card lg:grid-cols-2">
          <div className="p-8 sm:p-10 lg:p-12">
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-primary">
                  <MapPin className="size-4" /> Visit
                </div>
                <p className="mt-2 font-display text-lg font-bold">Waldrift Centre</p>
                <p className="text-muted-foreground">Vereeniging, Vaal Triangle, South Africa</p>
              </div>
              <div>
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-primary">
                  <Mail className="size-4" /> Email
                </div>
                <a href="mailto:admin@thehubsocials.co.za" className="mt-2 block font-display text-lg font-bold hover:text-primary">
                  admin@thehubsocials.co.za
                </a>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://wa.me/27000000000"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
                >
                  <MessageCircle className="size-4" /> WhatsApp
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background px-5 py-3 text-sm font-semibold hover:bg-muted"
                >
                  <Youtube className="size-4" /> YouTube
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background px-5 py-3 text-sm font-semibold hover:bg-muted"
                >
                  <Music2 className="size-4" /> SoundCloud
                </a>
              </div>

              <form onSubmit={submit} className="mt-6 space-y-4 border-t border-foreground/5 pt-8">
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Your name"
                  className="w-full rounded-2xl border border-foreground/10 bg-background px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="Email"
                  className="w-full rounded-2xl border border-foreground/10 bg-background px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="How can we help?"
                  className="w-full rounded-2xl border border-foreground/10 bg-background px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <button
                  type="submit"
                  disabled={busy}
                  className="w-full rounded-full bg-primary py-4 text-sm font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary-hover disabled:opacity-60"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          <div className="min-h-[420px] lg:min-h-full">
            <iframe
              title="Waldrift Centre, Vereeniging"
              src="https://www.google.com/maps?q=Waldrift+Centre+Vereeniging+South+Africa&output=embed"
              className="h-full w-full min-h-[420px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
