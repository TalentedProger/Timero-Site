import { useState, useCallback } from "react";

export interface Session {
  id: string;
  taskName: string;
  duration: number; // in seconds
  completedAt: string; // ISO date string
  status: "complete" | "interrupted";
  animationStyle: string;
  backgroundId: string;
}

export function useHistory() {
  const [history, setHistoryState] = useState<Session[]>(() => {
    const saved = localStorage.getItem("focus-history");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
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

  return { history, addSession, clearHistory };
}
