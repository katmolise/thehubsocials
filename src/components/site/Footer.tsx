import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube, Twitter } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const emailSchema = z.string().trim().email({ message: "Please enter a valid email" }).max(255);

export function Footer() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid email");
      return;
    }
    setBusy(true);
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: parsed.data });
    setBusy(false);
    if (error) {
      if (error.code === "23505") {
        toast.success("You're already subscribed — see you soon.");
        setEmail("");
        return;
      }
      toast.error("Couldn't subscribe just yet — please try again.");
      return;
    }
    toast.success("You're on the list — welcome to The Hub.");
    setEmail("");
  };

  return (
    <footer className="mt-24 border-t border-foreground/5 bg-card pt-20 pb-10">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid size-9 place-items-center rounded-xl bg-primary">
              <div className="size-4 rounded-full border-2 border-primary-foreground/70" />
            </div>
            <span className="font-display text-lg font-bold tracking-tight">The Hub Social</span>
          </Link>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Where community happens. Bringing together the Vaal Triangle through shared interests, one club at a time.
          </p>
          <div className="mt-6 flex gap-3">
            {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="grid size-10 place-items-center rounded-full border border-foreground/5 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <h5 className="mb-5 font-display text-sm font-bold">Platform</h5>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/clubs" className="hover:text-primary">Clubs</Link></li>
            <li><Link to="/events" className="hover:text-primary">Events</Link></li>
            <li><Link to="/gallery" className="hover:text-primary">Gallery</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h5 className="mb-5 font-display text-sm font-bold">Community</h5>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link to="/start-a-social" className="hover:text-primary">Start a Social</Link></li>
            <li><Link to="/blog" className="hover:text-primary">Blog</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-4">
          <h5 className="mb-5 font-display text-sm font-bold">Weekly Digest</h5>
          <p className="mb-4 text-sm text-muted-foreground">
            New clubs, upcoming events and community stories in your inbox.
          </p>
          <form onSubmit={submit} className="flex gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="min-w-0 flex-1 rounded-full border border-foreground/10 bg-background px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <button
              type="submit"
              disabled={busy}
              className="rounded-full bg-foreground px-5 py-3 text-xs font-bold uppercase tracking-widest text-background transition-colors hover:bg-primary hover:text-primary-foreground disabled:opacity-60"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-foreground/5 px-6 pt-8 text-xs text-muted-foreground md:flex-row">
        <p>© {new Date().getFullYear()} The Hub Social · Made in the Vaal Triangle, South Africa.</p>
        <div className="flex gap-6">
          <Link to="/" className="hover:text-foreground">Privacy Policy</Link>
          <Link to="/" className="hover:text-foreground">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
