import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useRouter } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";

export type Profile = {
  id: string;
  display_name: string;
  avatar_url: string | null;
};

interface SessionState {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
}

const SessionContext = createContext<SessionState>({
  user: null,
  profile: null,
  loading: true,
  refreshProfile: async () => {},
});

export function useSession() {
  return useContext(SessionContext);
}

function nameFromUser(user: User): string {
  const meta = user.user_metadata ?? {};
  const metaName =
    (meta.full_name as string | undefined) || (meta.name as string | undefined);
  if (metaName?.trim()) return metaName.trim();
  const local = user.email?.split("@")[0] ?? "";
  return local
    .replace(/[._-]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

export function SessionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const syncProfile = useCallback(async (current: User | null) => {
    if (!current) {
      setProfile(null);
      return;
    }
    const { data } = await supabase
      .from("profiles")
      .select("id, display_name, avatar_url")
      .eq("id", current.id)
      .maybeSingle();

    if (data && data.display_name) {
      setProfile(data as Profile);
      return;
    }

    const row = {
      id: current.id,
      display_name: nameFromUser(current),
      avatar_url: (current.user_metadata?.avatar_url as string | undefined) ?? null,
    };
    const { data: upserted } = await supabase
      .from("profiles")
      .upsert(row, { onConflict: "id" })
      .select("id, display_name, avatar_url")
      .maybeSingle();
    setProfile((upserted as Profile) ?? row);
  }, []);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
      void syncProfile(data.user);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      const nextUser = session?.user ?? null;
      setUser(nextUser);
      if (
        event === "SIGNED_IN" ||
        event === "SIGNED_OUT" ||
        event === "USER_UPDATED"
      ) {
        void syncProfile(nextUser);
        router.invalidate();
        if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
      }
    });

    return () => sub.subscription.unsubscribe();
  }, [router, queryClient, syncProfile]);

  const refreshProfile = useCallback(async () => {
    await syncProfile(user);
  }, [syncProfile, user]);

  return (
    <SessionContext.Provider value={{ user, profile, loading, refreshProfile }}>
      {children}
    </SessionContext.Provider>
  );
}
