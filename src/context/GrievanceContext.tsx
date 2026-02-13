import React, { createContext, useContext, useState, ReactNode } from "react";
import { Grievance, MOCK_GRIEVANCES } from "@/data/constants";

interface GrievanceContextType {
  grievances: Grievance[];
  addGrievance: (g: Grievance) => void;
  updateStatus: (id: string, status: Grievance["status"]) => void;
  deleteGrievance: (id: string) => void;
}

const GrievanceContext = createContext<GrievanceContextType | undefined>(undefined);

export function GrievanceProvider({ children }: { children: ReactNode }) {
  const [grievances, setGrievances] = useState<Grievance[]>(MOCK_GRIEVANCES);

  const addGrievance = (g: Grievance) => {
    setGrievances((prev) => [g, ...prev]);
  };

  const updateStatus = (id: string, status: Grievance["status"]) => {
    setGrievances((prev) =>
      prev.map((g) =>
        g.id === id ? { ...g, status, updatedAt: new Date().toISOString().split("T")[0] } : g
      )
    );
  };

  const deleteGrievance = (id: string) => {
    setGrievances((prev) => prev.filter((g) => g.id !== id));
  };

  return (
    <GrievanceContext.Provider value={{ grievances, addGrievance, updateStatus, deleteGrievance }}>
      {children}
    </GrievanceContext.Provider>
  );
}

export function useGrievances() {
  const ctx = useContext(GrievanceContext);
  if (!ctx) throw new Error("useGrievances must be used within GrievanceProvider");
  return ctx;
}
