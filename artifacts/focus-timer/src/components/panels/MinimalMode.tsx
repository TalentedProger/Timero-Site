import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";
import { getT } from "@/lib/i18n";

interface MinimalModeProps {
  isActive: boolean;
  onExit: () => void;
  timeLeft: number;
  isTimerActive: boolean;
  onToggleTimer: () => void;
}

export function MinimalMode({ isActive, onExit, timeLeft, isTimerActive, onToggleTimer }: MinimalModeProps) {
  const { settings } = useSettings();
  const t = getT(settings.language);
  const accent = settings.accentColor;

  const hours = Math.floor(timeLeft / 3600);
  const mins = Math.floor((timeLeft % 3600) / 60);
  const secs = timeLeft % 60;

  const showHours = timeLeft >= 3600;
  const formattedTime = showHours
    ? `${hours}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    : `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isActive) onExit();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isActive, onExit]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex items-center justify-center cursor-pointer bg-black/50 backdrop-blur-sm"
          onClick={onExit}
        >
          <div className="flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <motion.span
              className="text-[15vw] leading-none font-mono font-extralight tracking-tighter text-white tabular-nums drop-shadow-2xl select-none"
              style={{ textShadow: `0 0 60px ${accent}44` }}
            >
              {formattedTime}
            </motion.span>

            <button
              onClick={onToggleTimer}
              className="mt-8 p-4 rounded-full flex items-center justify-center backdrop-blur-md transition-all border border-white/20 text-white hover:bg-white/20"
              style={{ background: "rgba(255,255,255,0.10)" }}
            >
              {isTimerActive
                ? <Pause className="w-8 h-8" />
                : <Play className="w-8 h-8 ml-1" />
              }
            </button>

            <div className="absolute bottom-8 text-white/35 text-xs tracking-widest uppercase">
              {t.pressEsc}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
