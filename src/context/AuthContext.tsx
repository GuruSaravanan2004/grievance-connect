import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  // Legacy compat
  auth: { isLoggedIn: boolean; username: string; role: "admin" | "guest"; fullName?: string };
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdminBypass, setIsAdminBypass] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: window.location.origin,
      },
    });
    return { error: error?.message ?? null };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  };

  const signOut = async () => {
    setIsAdminBypass(false);
    await supabase.auth.signOut();
  };

  // Legacy compatibility
  const auth = {
    isLoggedIn: !!user || isAdminBypass,
    username: user?.email ?? (isAdminBypass ? "pravinsurender01@gmail.com" : ""),
    fullName: user?.user_metadata?.full_name ?? (isAdminBypass ? "Pravin Surender" : ""),
    role: (user?.email === "pravinsurender01@gmail.com" || isAdminBypass) ? ("admin" as const) : ("guest" as const),
  };

  const login = (username: string, _password: string) => {
    if (username === "pravinsurender01@gmail.com" && _password === "guru001") {
      setIsAdminBypass(true);
      return true;
    }
    return false;
  };
  const logout = () => { signOut(); };

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut, auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
