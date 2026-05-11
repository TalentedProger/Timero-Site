import { useState, useEffect } from "react";

export interface Settings {
  selectedBackground: string;
  animationStyle: "pulse" | "breathe" | "ripple" | "none";
  selectedSound: string;
  volume: number;
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
}

const defaultSettings: Settings = {
  selectedBackground: "asset-1",
  animationStyle: "breathe",
  selectedSound: "bell",
  volume: 50,
  defaultDuration: 25 * 60,
  autoRepeat: false,
  notificationTriggers: {
    "25": false,
    "50": false,
    "75": false,
    "100": true,
  },
  minimalMode: false,
  timeFormat: "24h",
};

export function useSettings() {
  const [settings, setSettingsState] = useState<Settings>(() => {
    const saved = localStorage.getItem("focus-settings");
    if (saved) {
      try {
        return { ...defaultSettings, ...JSON.parse(saved) };
      } catch (e) {
        return defaultSettings;
      }
    }
    return defaultSettings;
  });

  const setSettings = (newSettings: Partial<Settings> | ((prev: Settings) => Settings)) => {
    setSettingsState((prev) => {
      const updated = typeof newSettings === "function" ? newSettings(prev) : { ...prev, ...newSettings };
      localStorage.setItem("focus-settings", JSON.stringify(updated));
      return updated;
    });
  };

  return { settings, setSettings };
}
