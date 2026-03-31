import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Grievance } from "@/data/constants";
import { supabase } from "@/integrations/supabase/client";

interface GrievanceContextType {
  grievances: Grievance[];
  loading: boolean;
  addGrievance: (g: Grievance) => Promise<{ error: string | null }>;
  updateStatus: (id: string, status: Grievance["status"]) => Promise<{ error: string | null }>;
  deleteGrievance: (id: string) => Promise<{ error: string | null }>;
}

const GrievanceContext = createContext<GrievanceContextType | undefined>(undefined);

export function GrievanceProvider({ children }: { children: ReactNode }) {
  const [grievances, setGrievances] = useState<Grievance[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGrievances = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("grievances" as any)
      .select("*")
      .order("submittedAt", { ascending: false });
    
    if (!error && data) {
      setGrievances(data as any as Grievance[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGrievances();
  }, []);

  const addGrievance = async (g: Grievance) => {
    // Optimistic update
    setGrievances((prev) => [g, ...prev]);
    const { error } = await supabase.from("grievances" as any).insert(g);
    if (error) {
      // Revert if failed (in a real app, might want to be more sophisticated)
      fetchGrievances();
    }
    return { error: error?.message ?? null };
  };

  const updateStatus = async (id: string, status: Grievance["status"]) => {
    setGrievances((prev) =>
      prev.map((g) =>
        g.id === id ? { ...g, status, updatedAt: new Date().toISOString().split("T")[0] } : g
      )
    );
    const { error } = await supabase.from("grievances" as any).update({ status }).eq("id", id);
    if (error) fetchGrievances();
    return { error: error?.message ?? null };
  };

  const deleteGrievance = async (id: string) => {
    setGrievances((prev) => prev.filter((g) => g.id !== id));
    const { error } = await supabase.from("grievances" as any).delete().eq("id", id);
    if (error) fetchGrievances();
    return { error: error?.message ?? null };
  };

  return (
    <GrievanceContext.Provider value={{ grievances, loading, addGrievance, updateStatus, deleteGrievance }}>
      {children}
    </GrievanceContext.Provider>
  );
}

export function useGrievances() {
  const ctx = useContext(GrievanceContext);
  if (!ctx) throw new Error("useGrievances must be used within GrievanceProvider");
  return ctx;
}
