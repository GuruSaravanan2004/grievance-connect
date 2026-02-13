import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthState {
  isLoggedIn: boolean;
  username: string;
  role: "admin" | "guest";
}

interface AuthContextType {
  auth: AuthState;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({
    isLoggedIn: false,
    username: "",
    role: "guest",
  });

  const login = (username: string, password: string): boolean => {
    if (username === "admin" && password === "admin123") {
      setAuth({ isLoggedIn: true, username: "admin", role: "admin" });
      return true;
    }
    return false;
  };

  const logout = () => {
    setAuth({ isLoggedIn: false, username: "", role: "guest" });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
