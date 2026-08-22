import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pause, Play, ArrowLeft } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";
import { getT } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { backgrounds } from "@/lib/backgrounds";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();

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

  // Оптимизированные параметры анимации для мобильных
  const animationDuration = isMobile ? 0.25 : 0.35;
  const animationEasing = [0.32, 0.72, 0, 1]; // Кастомная easing функция для плавности

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: animationDuration,
            ease: animationEasing
          }}
          className={cn(
            "fixed inset-0 z-[100] flex items-center justify-center cursor-pointer",
            settings.minimalModeBg === "blur" ? "bg-black/50 backdrop-blur-sm" : "bg-black"
          )}
          style={{
            willChange: "opacity",
          }}
          onClick={onExit}
        >
          {settings.minimalModeBg === "image" && (
            <div className="absolute inset-0 z-0">
              <img 
                src={bgImage} 
                alt="background" 
                className="w-full h-full object-cover"
                style={{
                  willChange: "auto",
                }}
              />
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{ background: `rgba(0,0,0,${settings.backgroundDim / 100})` }}
              />
            </div>
          )}
          <div className="flex flex-col items-center w-full h-full justify-center relative z-10" onClick={(e) => e.stopPropagation()}>
            <motion.span
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ 
                duration: animationDuration,
                ease: animationEasing
              }}
              className={cn("text-[25vw] sm:text-[18vw] leading-none font-extralight tracking-tighter text-white tabular-nums drop-shadow-2xl select-none", fontClass)}
              style={{
                textShadow: `0 0 60px ${accent}44`,
                transform: isReducedFont ? "scale(0.96)" : undefined,
                marginTop: isPlayfair ? "-0.15em" : undefined,
                willChange: isMobile ? "auto" : "transform, opacity",
              }}
            >
              {formattedTime}
            </motion.span>

            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ 
                duration: animationDuration,
                ease: animationEasing,
                delay: isMobile ? 0 : 0.1
              }}
              onClick={onExit}
              className="absolute top-6 left-6 sm:top-8 sm:left-8 w-11 h-11 sm:w-16 sm:h-16 rounded-full flex items-center justify-center backdrop-blur-md transition-all border border-white/20 text-white hover:bg-white/20 z-10"
              style={{ 
                background: "rgba(255,255,255,0.10)",
                willChange: isMobile ? "auto" : "transform",
              }}
            >
              <ArrowLeft className="w-5 h-5 sm:w-7 sm:h-7" />
            </motion.button>
            
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ 
                duration: animationDuration,
                ease: animationEasing,
                delay: isMobile ? 0 : 0.1
              }}
              onClick={onToggleTimer}
              className="absolute top-6 right-6 sm:top-8 sm:right-8 w-11 h-11 sm:w-16 sm:h-16 rounded-full flex items-center justify-center backdrop-blur-md transition-all border border-white/20 text-white hover:bg-white/20 z-10"
              style={{ 
                background: "rgba(255,255,255,0.10)",
                willChange: isMobile ? "auto" : "transform",
              }}
            >
              {isTimerActive
                ? <Pause className="w-5 h-5 sm:w-7 sm:h-7" fill="currentColor" />
                : <Play className="w-5 h-5 sm:w-7 sm:h-7 ml-0.5 sm:ml-1" fill="currentColor" />
              }
            </motion.button>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ 
                duration: animationDuration,
                ease: animationEasing,
                delay: isMobile ? 0 : 0.15
              }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/35 text-xs tracking-widest uppercase text-center w-full hidden sm:block"
            >
              {t.pressEsc}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
