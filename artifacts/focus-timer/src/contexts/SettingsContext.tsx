import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export interface Settings {
  selectedBackground: string;
  customBackgroundUrl: string;
  animationStyle: "pulse" | "breathe" | "ripple" | "none";
  animationSpeed: number;
  selectedSound: string;
  volume: number;
  soundRepeatCount: number;
  soundPlayDuration: number;
  defaultDuration: number;
  autoRepeat: boolean;
  notificationTriggers: {
    "25": boolean;
    "50": boolean;
    "75": boolean;
    "100": boolean;
  };
  minimalMode: boolean;
  timeFormat: "12h" | "24h";
  accentColor: string;
  backgroundDim: number;
  language: string;
  fontFamily: string;
  minimalModeBg: "blur" | "image";
}

const defaultSettings: Settings = {
  selectedBackground: "interior",
  customBackgroundUrl: "",
  animationStyle: "none",
  animationSpeed: 50,
  selectedSound: "bell",
  volume: 50,
  soundRepeatCount: 5,
  soundPlayDuration: 5,
  defaultDuration: 25 * 60,
  autoRepeat: false,
  notificationTriggers: { "25": false, "50": false, "75": false, "100": true },
  minimalMode: false,
  timeFormat: "24h",
  accentColor: "#8b5cf6",
  backgroundDim: 35,
  language: "ru",
  fontFamily: "dm-sans",
  minimalModeBg: "image",
};

interface SettingsContextValue {
  settings: Settings;
  setSettings: (update: Partial<Settings> | ((prev: Settings) => Settings)) => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettingsState] = useState<Settings>(() => {
    const saved = localStorage.getItem("focus-settings");
    if (saved) {
      try {
        return { ...defaultSettings, ...JSON.parse(saved) };
      } catch {
        return defaultSettings;
      }
    }
    return defaultSettings;
  });

  const setSettings = (update: Partial<Settings> | ((prev: Settings) => Settings)) => {
    setSettingsState((prev) => {
      const updated = typeof update === "function" ? update(prev) : { ...prev, ...update };
      localStorage.setItem("focus-settings", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
