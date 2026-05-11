import { useCallback } from "react";
import { playSound as synthSound } from "@/lib/sounds";
import { useSettings } from "./useSettings";

export function useSound() {
  const { settings } = useSettings();

  const playSound = useCallback(
    (type?: string) => {
      synthSound(type || settings.selectedSound, settings.volume);
    },
    [settings.selectedSound, settings.volume]
  );

  return { playSound };
}
