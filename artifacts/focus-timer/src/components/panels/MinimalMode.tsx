import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pause, Play, ArrowLeft } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";
import { getT } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { backgrounds } from "@/lib/backgrounds";

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

  // Determine current background image
  const bgImage = settings.selectedBackground === "custom" 
    ? settings.customBackgroundUrl 
    : backgrounds.find((b) => b.id === settings.selectedBackground)?.url || backgrounds[0].url;

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
          className={cn(
            "fixed inset-0 z-[100] flex items-center justify-center cursor-pointer",
            settings.minimalModeBg === "blur" ? "bg-black/50 backdrop-blur-sm" : "bg-black"
          )}
          onClick={onExit}
        >
          {settings.minimalModeBg === "image" && (
            <div className="absolute inset-0 z-0">
              <img 
                src={bgImage} 
                alt="background" 
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{ background: `rgba(0,0,0,${settings.backgroundDim / 100})` }}
              />
            </div>
          )}
          <div className="flex flex-col items-center w-full h-full justify-center relative z-10" onClick={(e) => e.stopPropagation()}>
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
              className="absolute top-6 left-6 sm:top-8 sm:left-8 w-11 h-11 sm:w-16 sm:h-16 rounded-full flex items-center justify-center backdrop-blur-md transition-all border border-white/20 text-white hover:bg-white/20 z-10"
              style={{ background: "rgba(255,255,255,0.10)" }}
            >
              <ArrowLeft className="w-5 h-5 sm:w-7 sm:h-7" />
            </button>
            <button
              onClick={onToggleTimer}
              className="absolute top-6 right-6 sm:top-8 sm:right-8 w-11 h-11 sm:w-16 sm:h-16 rounded-full flex items-center justify-center backdrop-blur-md transition-all border border-white/20 text-white hover:bg-white/20 z-10"
              style={{ background: "rgba(255,255,255,0.10)" }}
            >
              {isTimerActive
                ? <Pause className="w-5 h-5 sm:w-7 sm:h-7" fill="currentColor" />
                : <Play className="w-5 h-5 sm:w-7 sm:h-7 ml-0.5 sm:ml-1" fill="currentColor" />
              }
            </button>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/35 text-xs tracking-widest uppercase text-center w-full hidden sm:block">
              {t.pressEsc}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
