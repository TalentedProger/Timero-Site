import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SessionPresetsProps {
  onSelectPreset: (durationSeconds: number) => void;
  activeDuration: number;
}

const presets = [
  { label: "Focus", minutes: 25 },
  { label: "Short Break", minutes: 5 },
  { label: "Long Break", minutes: 15 },
];

export function SessionPresets({ onSelectPreset, activeDuration }: SessionPresetsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 z-10">
      {presets.map((preset) => {
        const isActive = activeDuration === preset.minutes * 60;
        return (
          <button
            key={preset.label}
            onClick={() => onSelectPreset(preset.minutes * 60)}
            className={cn(
              "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
              isActive
                ? "bg-primary text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]"
                : "glass-panel text-white/70 hover:text-white hover:bg-white/10"
            )}
          >
            {preset.label}
          </button>
        );
      })}
    </div>
  );
}
