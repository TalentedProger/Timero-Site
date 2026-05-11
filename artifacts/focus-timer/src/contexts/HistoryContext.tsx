import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";

export interface Session {
  id: string;
  taskName: string;
  duration: number;
  completedAt: string;
  status: "complete" | "interrupted";
  animationStyle: string;
  backgroundId: string;
}

interface HistoryContextValue {
  history: Session[];
  addSession: (session: Omit<Session, "id" | "completedAt">) => Session;
  clearHistory: () => void;
}

const HistoryContext = createContext<HistoryContextValue | null>(null);

export function HistoryProvider({ children }: { children: ReactNode }) {
  const [history, setHistoryState] = useState<Session[]>(() => {
    const saved = localStorage.getItem("focus-history");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  const addSession = useCallback((session: Omit<Session, "id" | "completedAt">) => {
    const newSession: Session = {
      ...session,
      id: crypto.randomUUID(),
      completedAt: new Date().toISOString(),
    };
    setHistoryState((prev) => {
      const updated = [newSession, ...prev];
      localStorage.setItem("focus-history", JSON.stringify(updated));
      return updated;
    });
    return newSession;
  }, []);

  const clearHistory = useCallback(() => {
    setHistoryState([]);
    localStorage.removeItem("focus-history");
  }, []);

  return (
    <HistoryContext.Provider value={{ history, addSession, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory() {
  const ctx = useContext(HistoryContext);
  if (!ctx) throw new Error("useHistory must be used within HistoryProvider");
  return ctx;
}
