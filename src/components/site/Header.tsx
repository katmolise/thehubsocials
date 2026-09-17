import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Sun, Moon, LogOut, UserRound } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/use-session";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/clubs", label: "Community Clubs" },
  { to: "/events", label: "Events" },
  { to: "/start-a-social", label: "Start a Social" },
  { to: "/gallery", label: "Gallery" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, loading } = useSession();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    const initial =
      typeof window !== "undefined" &&
      (localStorage.getItem("hub-theme") === "dark" ||
        (!localStorage.getItem("hub-theme") &&
          window.matchMedia("(prefers-color-scheme: dark)").matches));
    if (initial) {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("hub-theme", next ? "dark" : "light");
  };

  const handleSignOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  return (
    <header className="sticky top-0 z-50 w-full px-3 pt-3 sm:px-4 sm:pt-4">
      <nav
        className={`mx-auto grid h-16 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border border-foreground/5 px-4 transition-all sm:px-6 lg:flex lg:justify-between ${
          scrolled ? "bg-background/80 shadow-lg shadow-foreground/5 backdrop-blur-xl" : "bg-background/60 backdrop-blur-md"
        }`}
      >
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary">
            <div className="size-4 rounded-full border-2 border-primary-foreground/70" />
          </div>
          <span className="truncate font-display text-base font-bold sm:text-lg">
            The Hub Social
          </span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {links.slice(0, 7).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}

          {/* Session-aware affordance */}
          {!loading && user ? (
            <div className="flex items-center gap-2">
              <Link
                to="/auth"
                className="flex items-center gap-2 rounded-full border border-foreground/10 px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
                title={user.email}
              >
                <UserRound className="size-4 text-primary" />
                <span className="max-w-[120px] truncate text-xs">
                  {user.email}
                </span>
              </Link>
              <button
                onClick={handleSignOut}
                aria-label="Sign out"
                className="grid size-9 place-items-center rounded-full border border-foreground/10 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <LogOut className="size-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Sign In
            </Link>
          )}

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="grid size-9 place-items-center rounded-full border border-foreground/10 text-muted-foreground transition-colors hover:text-foreground"
          >
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
        </div>

        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="grid size-9 place-items-center rounded-full border border-foreground/10"
          >
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="grid size-9 place-items-center rounded-full border border-foreground/10"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-2xl border border-foreground/5 bg-background/95 p-4 shadow-xl backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                activeProps={{ className: "bg-muted text-foreground" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}

            {/* Mobile session affordance */}
            <div className="mt-2 border-t border-foreground/5 pt-3">
              {!loading && user ? (
                <div className="flex items-center justify-between gap-2 px-4">
                  <span className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </span>
                  <button
                    onClick={() => {
                      setOpen(false);
                      handleSignOut();
                    }}
                    className="flex items-center gap-2 rounded-full border border-foreground/10 px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    <LogOut className="size-4" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setOpen(false)}
                  className="rounded-xl bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
