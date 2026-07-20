import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, X } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  name: z.string().trim().min(1, "Name required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  guests: z.coerce.number().int().min(1).max(10),
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
});

type Props = {
  open: boolean;
  onClose: () => void;
  eventSlug: string;
  eventTitle: string;
  onSuccess?: () => void;
};

export function RsvpDialog({ open, onClose, eventSlug, eventTitle, onSuccess }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState<null | { name: string }>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function reset() {
    setConfirmed(null);
    setErrors({});
    setSubmitting(false);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone") || "",
      guests: form.get("guests") || 1,
      notes: form.get("notes") || "",
    });
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) errs[issue.path[0] as string] = issue.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    const { error } = await supabase.from("rsvps").insert({
      event_slug: eventSlug,
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      guests: parsed.data.guests,
      notes: parsed.data.notes || null,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Couldn't submit RSVP. Please try again.");
      return;
    }
    setConfirmed({ name: parsed.data.name });
  }

  function handleClose() {
    onClose();
    setTimeout(reset, 250);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end justify-center bg-foreground/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={handleClose}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", damping: 24, stiffness: 260 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg overflow-hidden rounded-t-[32px] bg-card p-6 shadow-2xl sm:rounded-[32px] sm:p-8"
          >
            <button
              onClick={handleClose}
              aria-label="Close"
              className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <X className="size-5" />
            </button>

            {confirmed ? (
              <div className="py-6 text-center">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", damping: 12, stiffness: 200 }}
                  className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/15 text-primary"
                >
                  <CheckCircle2 className="size-9" />
                </motion.div>
                <h3 className="mt-5 font-display text-2xl font-bold">You're on the list!</h3>
                <p className="mt-2 text-muted-foreground">
                  Thanks {confirmed.name.split(" ")[0]} — we've saved your RSVP for{" "}
                  <span className="font-semibold text-foreground">{eventTitle}</span>. We'll email
                  you a reminder closer to the day.
                </p>
                <button
                  onClick={handleClose}
                  className="mt-6 w-full rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary-hover"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <h3 className="font-display text-2xl font-bold">RSVP</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{eventTitle}</p>
                </div>

                <Field label="Full name" error={errors.name}>
                  <input
                    name="name"
                    required
                    maxLength={100}
                    className={inputCls}
                    placeholder="Jane Dlamini"
                  />
                </Field>

                <Field label="Email" error={errors.email}>
                  <input
                    name="email"
                    type="email"
                    required
                    maxLength={255}
                    className={inputCls}
                    placeholder="jane@example.com"
                  />
                </Field>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="Phone (optional)" error={errors.phone}>
                    <input name="phone" maxLength={40} className={inputCls} placeholder="+27..." />
                  </Field>
                  <Field label="Guests" error={errors.guests}>
                    <input
                      name="guests"
                      type="number"
                      min={1}
                      max={10}
                      defaultValue={1}
                      className={inputCls}
                    />
                  </Field>
                </div>

                <Field label="Anything we should know? (optional)" error={errors.notes}>
                  <textarea
                    name="notes"
                    maxLength={1000}
                    rows={3}
                    className={`${inputCls} resize-none`}
                    placeholder="Dietary requirements, first-timer, etc."
                  />
                </Field>

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-colors hover:bg-primary-hover disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" /> Submitting...
                    </>
                  ) : (
                    "Confirm RSVP"
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const inputCls =
  "w-full rounded-2xl border border-foreground/10 bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
