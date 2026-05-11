import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSettings } from "@/hooks/useSettings";

interface SessionPresetsProps {
  onSelectPreset: (durationSeconds: number) => void;
  activeDuration: number;
}

const PRESETS = [
  { label: "5m", seconds: 5 * 60 },
  { label: "15m", seconds: 15 * 60 },
  { label: "25m", seconds: 25 * 60 },
  { label: "45m", seconds: 45 * 60 },
  { label: "1h", seconds: 60 * 60 },
  { label: "2h", seconds: 120 * 60 },
];

export function SessionPresets({ onSelectPreset, activeDuration }: SessionPresetsProps) {
  const { settings } = useSettings();
  const accent = settings.accentColor;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="flex flex-wrap items-center justify-center gap-2"
    >
      {PRESETS.map((preset, i) => {
        const isActive = activeDuration === preset.seconds;
        return (
          <motion.button
            key={preset.label}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 * i }}
            onClick={() => onSelectPreset(preset.seconds)}
            data-testid={`preset-${preset.label}`}
            className={cn(
              "relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300",
              isActive ? "text-white" : "text-white/50 hover:text-white/80"
            )}
            style={
              isActive
                ? {
                    background: `${accent}28`,
                    border: `1px solid ${accent}66`,
                    boxShadow: `0 0 16px ${accent}30, inset 0 1px 0 rgba(255,255,255,0.08)`,
                  }
                : {
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }
            }
          >
            {preset.label}
          </motion.button>
        );
      })}
    </motion.div>
  );
}
