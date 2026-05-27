import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pause, Play, ArrowLeft } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";
import { getT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

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

  const fontClass = {
    "sf-pro": "font-sans",
    "playfair": "font-serif",
    "dm-sans": "font-['DM_Sans']",
    "montserrat": "font-['Montserrat']",
    "inter": "font-['Inter']",
  }[settings.fontFamily] || "font-sans";

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isActive) onExit();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isActive, onExit]);

  const isReducedFont = ["dm-sans", "montserrat", "inter"].includes(settings.fontFamily);
  const isPlayfair = settings.fontFamily === "playfair";

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
          <div className="flex flex-col items-center w-full h-full justify-center relative" onClick={(e) => e.stopPropagation()}>
            <motion.span
              className={cn("text-[25vw] sm:text-[18vw] leading-none font-extralight tracking-tighter text-white tabular-nums drop-shadow-2xl select-none", fontClass)}
              style={{
                textShadow: `0 0 60px ${accent}44`,
                transform: isReducedFont ? "scale(0.96)" : undefined,
                marginTop: isPlayfair ? "-0.15em" : undefined
              }}
            >
              {formattedTime}
            </motion.span>

            <button
              onClick={onExit}
              className="absolute top-6 left-6 p-3 sm:p-5 rounded-full flex items-center justify-center backdrop-blur-md transition-all border border-white/20 text-white hover:bg-white/20 z-10"
              style={{ background: "rgba(255,255,255,0.10)" }}
            >
              <ArrowLeft className="w-5 h-5 sm:w-8 sm:h-8" />
            </button>
            <button
              onClick={onToggleTimer}
              className="absolute top-6 right-6 sm:static sm:mt-12 p-3 sm:p-5 rounded-full flex items-center justify-center backdrop-blur-md transition-all border border-white/20 text-white hover:bg-white/20 z-10"
              style={{ background: "rgba(255,255,255,0.10)" }}
            >
              {isTimerActive
                ? <Pause className="w-5 h-5 sm:w-8 sm:h-8" />
                : <Play className="w-5 h-5 sm:w-8 sm:h-8 ml-0.5 sm:ml-1" />
              }
            </button>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/35 text-xs tracking-widest uppercase text-center w-full">
              {t.pressEsc}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
