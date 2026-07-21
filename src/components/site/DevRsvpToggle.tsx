import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Sparkles, Trash2, FlaskConical, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { seedDummyRsvps, clearDummyRsvps, reseedAllDummyRsvps } from "@/lib/dev-rsvps.functions";

type Props = {
  slug: string;
  onChanged: () => void;
};

export function DevRsvpToggle({ slug, onChanged }: Props) {
  if (!import.meta.env.DEV) return null;
  return <DevRsvpTogglePanel slug={slug} onChanged={onChanged} />;
}

function DevRsvpTogglePanel({ slug, onChanged }: Props) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState<null | "seed" | "clear" | "all">(null);
  const [count, setCount] = useState(8);
  const seed = useServerFn(seedDummyRsvps);
  const clear = useServerFn(clearDummyRsvps);
  const reseedAll = useServerFn(reseedAllDummyRsvps);

  async function doSeed() {
    setBusy("seed");
    try {
      const res = await seed({ data: { slug, count } });
      toast.success(`Seeded ${res.inserted} dummy RSVPs`);
      onChanged();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Seed failed");
    } finally {
      setBusy(null);
    }
  }

  async function doClear() {
    setBusy("clear");
    try {
      await clear({ data: { slug } });
      toast.success("Cleared dummy RSVPs");
      onChanged();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Clear failed");
    } finally {
      setBusy(null);
    }
  }
  async function doReseedAll() {
    setBusy("all");
    try {
      const res = await reseedAll({ data: { perEvent: count } });
      toast.success(`Reseeded ${res.inserted} RSVPs across ${res.events} events`);
      onChanged();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Reseed all failed");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="fixed bottom-4 left-4 z-[90]">
      {open ? (
        <div className="w-72 rounded-2xl border border-foreground/10 bg-card p-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <FlaskConical className="size-4 text-primary" /> Dev · RSVP data
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Hide
            </button>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Only affects rows with <code>{"@dummy.local"}</code> emails for this event.
          </p>
          <label className="mt-3 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Count
          </label>
          <input
            type="number"
            min={1}
            max={20}
            value={count}
            onChange={(e) => setCount(Math.min(20, Math.max(1, Number(e.target.value) || 1)))}
            className="mt-1 w-full rounded-xl border border-foreground/10 bg-background px-3 py-2 text-sm"
          />
          <div className="mt-3 flex gap-2">
            <button
              onClick={doSeed}
              disabled={busy !== null}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary-hover disabled:opacity-60"
            >
              {busy === "seed" ? <Loader2 className="size-3.5 animate-spin" /> : <Sparkles className="size-3.5" />}
              Refresh
            </button>
            <button
              onClick={doClear}
              disabled={busy !== null}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-foreground/10 px-3 py-2 text-xs font-semibold hover:bg-muted disabled:opacity-60"
            >
              {busy === "clear" ? <Loader2 className="size-3.5 animate-spin" /> : <Trash2 className="size-3.5" />}
              Clear
            </button>
          </div>
          <button
            onClick={doReseedAll}
            disabled={busy !== null}
            className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-2 text-xs font-semibold text-primary hover:bg-primary/20 disabled:opacity-60"
          >
            {busy === "all" ? <Loader2 className="size-3.5 animate-spin" /> : <RefreshCw className="size-3.5" />}
            Reseed all events
          </button>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-full border border-foreground/10 bg-card px-4 py-2 text-xs font-semibold shadow-lg hover:bg-muted"
        >
          <FlaskConical className="size-4 text-primary" /> Dev tools
        </button>
      )}
    </div>
  );
}
