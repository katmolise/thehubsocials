
CREATE TABLE public.rsvps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_slug TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  guests INTEGER NOT NULL DEFAULT 1 CHECK (guests >= 1 AND guests <= 10),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT INSERT ON public.rsvps TO anon, authenticated;
GRANT ALL ON public.rsvps TO service_role;

ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create an RSVP"
  ON public.rsvps FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(name) BETWEEN 1 AND 100
    AND length(email) BETWEEN 3 AND 255
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND (phone IS NULL OR length(phone) <= 40)
    AND (notes IS NULL OR length(notes) <= 1000)
  );

CREATE INDEX rsvps_event_slug_idx ON public.rsvps(event_slug);
