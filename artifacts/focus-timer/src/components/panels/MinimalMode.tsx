import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pause, Play } from "lucide-react";

interface MinimalModeProps {
  isActive: boolean;
  onExit: () => void;
  timeLeft: number;
  isTimerActive: boolean;
  onToggleTimer: () => void;
}

export function MinimalMode({ isActive, onExit, timeLeft, isTimerActive, onToggleTimer }: MinimalModeProps) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isActive) {
        onExit();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isActive, onExit]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center cursor-pointer bg-black/40 backdrop-blur-sm"
          onClick={onExit}
        >
          <div 
            className="flex flex-col items-center"
            onClick={(e) => e.stopPropagation()} // Prevent clicks on timer from exiting
          >
            <motion.span 
              layoutId="timer-digits"
              className="text-[15vw] leading-none font-mono font-extralight tracking-tighter text-white tabular-nums drop-shadow-2xl"
            >
              {formattedTime}
            </motion.span>
            
            <button
              onClick={onToggleTimer}
              className="mt-8 p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors border border-white/20 text-white"
            >
              {isTimerActive ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
            </button>
            
            <div className="absolute bottom-8 text-white/40 text-sm tracking-widest uppercase">
              Press ESC or click anywhere to exit
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
