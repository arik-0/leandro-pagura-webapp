import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let mounted = true;
    try {
      supabase.auth
        .getUser()
        .then(({ data }) => {
          if (!mounted) return;
          setUser(data?.user ?? null);
          setLoading(false);
        })
        .catch((err) => {
          console.warn("[useAuth] getUser error:", err);
          if (mounted) setLoading(false);
        });

      const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
        if (mounted) setUser(session?.user ?? null);
      });
      return () => {
        mounted = false;
        sub?.subscription?.unsubscribe();
      };
    } catch (e) {
      console.warn("[useAuth] initialization error:", e);
      if (mounted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      return;
    }
    try {
      supabase
        .rpc("has_role", { _user_id: user.id, _role: "admin" })
        .then(({ data }) => {
          setIsAdmin(!!data);
        })
        .catch((err) => {
          console.warn("[useAuth] has_role error:", err);
        });
    } catch (e) {
      console.warn("[useAuth] rpc error:", e);
    }
  }, [user]);

  return { user, loading, isAdmin };
}
