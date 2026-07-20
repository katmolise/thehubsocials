
CREATE OR REPLACE FUNCTION public.get_event_attendees(_event_slug text)
RETURNS TABLE(name text, guests integer, created_at timestamptz)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT name, guests, created_at
  FROM public.rsvps
  WHERE event_slug = _event_slug
  ORDER BY created_at ASC
$$;

GRANT EXECUTE ON FUNCTION public.get_event_attendees(text) TO anon, authenticated;
