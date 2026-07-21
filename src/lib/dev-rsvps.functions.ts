import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const DUMMY_DOMAIN = "@dummy.local";

const NAMES = [
  "Thabo Mokoena", "Lerato Ndlovu", "Sipho Zulu", "Ayanda Khumalo",
  "Naledi Botha", "Kagiso Dlamini", "Zanele Mabaso", "Bongani Nkosi",
  "Palesa Sithole", "Tshepo Moloi", "Refilwe Mahlangu", "Mpho Sibiya",
  "Anele Radebe", "Karabo Mthembu", "Nomvula Cele", "Sibusiso Ngcobo",
  "Lindiwe Pillay", "Jaco van Wyk", "Chloé Petersen", "Ryan Naidoo",
];

const slugSchema = z.object({ slug: z.string().min(1).max(120) });

export const seedDummyRsvps = createServerFn({ method: "POST" })
  .inputValidator((input: { slug: string; count?: number }) => ({
    ...slugSchema.parse({ slug: input.slug }),
    count: Math.min(Math.max(input.count ?? 8, 1), 20),
  }))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    // Wipe existing dummies for this slug first
    await supabaseAdmin
      .from("rsvps")
      .delete()
      .eq("event_slug", data.slug)
      .like("email", `%${DUMMY_DOMAIN}`);

    const shuffled = [...NAMES].sort(() => Math.random() - 0.5).slice(0, data.count);
    const rows = shuffled.map((name, i) => ({
      event_slug: data.slug,
      name,
      email: `${name.toLowerCase().replace(/\s+/g, ".")}.${i}${DUMMY_DOMAIN}`,
      phone: null,
      guests: Math.random() < 0.25 ? 2 : 1,
      notes: null,
    }));

    const { error } = await supabaseAdmin.from("rsvps").insert(rows);
    if (error) throw new Error(error.message);
    return { inserted: rows.length };
  });

export const clearDummyRsvps = createServerFn({ method: "POST" })
  .inputValidator((input: { slug: string }) => slugSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("rsvps")
      .delete()
      .eq("event_slug", data.slug)
      .like("email", `%${DUMMY_DOMAIN}`);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
