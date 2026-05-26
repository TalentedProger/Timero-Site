import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, Timer } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSettings } from "@/hooks/useSettings";

interface TimerControlsProps {
  isActive: boolean;
  timeLeft: number;
  duration: number;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSetDuration: () => void;
}

export function TimerControls({
  isActive,
  timeLeft,
  duration,
  onStart,
  onPause,
  onReset,
  onSetDuration,
}: TimerControlsProps) {
  const { settings } = useSettings();
  const accent = settings.accentColor;

  const isAtStart = timeLeft === duration && !isActive;

  return (
    <div className="flex items-center justify-center gap-5 mt-8 z-10">
      {/* Reset */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={onReset}
        disabled={isAtStart}
        data-testid="button-reset"
        className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:bg-white/12 hover:border-white/20",
          isAtStart && "opacity-40 cursor-not-allowed pointer-events-none"
        )}
      >
        <RotateCcw className="w-5 h-5 text-white/80" strokeWidth={2} />
      </motion.button>

      {/* Play / Pause — large accent button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={isActive ? onPause : onStart}
        data-testid="button-play-pause"
        className="w-20 h-20 rounded-full flex items-center justify-center transition-all"
        style={{
          background: accent,
        }}
      >
        {isActive ? (
          <Pause className="w-8 h-8 text-white fill-white" strokeWidth={0} />
        ) : (
          <Play className="w-8 h-8 text-white fill-white translate-x-1" strokeWidth={0} />
        )}
      </motion.button>

      {/* Set Duration */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={onSetDuration}
        data-testid="button-set-duration"
        className="w-14 h-14 rounded-full flex items-center justify-center border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:bg-white/12 hover:border-white/20"
      >
        <Timer className="w-5 h-5 text-white/80" strokeWidth={2} />
      </motion.button>
    </div>
  );
}
