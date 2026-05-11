import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Minus, Plus, Edit2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimerDisplayProps {
  timeLeft: number;
  duration: number;
  isActive: boolean;
  animationStyle: string;
  onEditClick: () => void;
  onAdjust: (deltaSecs: number) => void;
}

export function TimerDisplay({
  timeLeft,
  duration,
  isActive,
  animationStyle,
  onEditClick,
  onAdjust,
}: TimerDisplayProps) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const progress = duration > 0 ? ((duration - timeLeft) / duration) * 100 : 0;
  const circumference = 2 * Math.PI * 140;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // urgency glow — ramps up in last 20%
  const urgency = progress > 80 ? (progress - 80) / 20 : 0;
  const glowColor = urgency > 0
    ? `rgba(239,68,68,${0.25 + urgency * 0.35})`
    : "rgba(139,92,246,0.3)";

  // Hold-to-adjust logic
  const holdRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const holdCountRef = useRef(0);

  const startHold = useCallback((delta: number) => {
    if (isActive) return;
    holdCountRef.current = 0;
    onAdjust(delta);
    holdRef.current = setInterval(() => {
      holdCountRef.current += 1;
      const speed = holdCountRef.current > 12 ? 5 * 60 : 60;
      onAdjust(delta > 0 ? speed : -speed);
    }, 150);
  }, [isActive, onAdjust]);

  const stopHold = useCallback(() => {
    if (holdRef.current) {
      clearInterval(holdRef.current);
      holdRef.current = null;
    }
  }, []);

  // Scroll to adjust
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (isActive) return;
      e.preventDefault();
      const delta = e.deltaY > 0 ? -60 : 60;
      onAdjust(delta);
    },
    [isActive, onAdjust]
  );

  const breatheVariants =
    animationStyle === "pulse" || animationStyle === "breathe"
      ? {
          animate: isActive
            ? {
                scale: [1, 1.012, 1],
                transition: {
                  duration: animationStyle === "breathe" ? 4 : 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }
            : {},
        }
      : {};

  return (
    <div className="flex items-center gap-4 sm:gap-8">
      {/* Minus button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.93 }}
        onMouseDown={() => startHold(-60)}
        onMouseUp={stopHold}
        onMouseLeave={stopHold}
        onTouchStart={() => startHold(-60)}
        onTouchEnd={stopHold}
        disabled={isActive}
        data-testid="button-adjust-minus"
        className={cn(
          "w-11 h-11 rounded-full flex items-center justify-center border border-white/10 bg-white/5 transition-all",
          isActive
            ? "opacity-0 pointer-events-none"
            : "opacity-100 hover:bg-white/12 hover:border-white/20 text-white/60 hover:text-white"
        )}
      >
        <Minus className="w-4 h-4" />
      </motion.button>

      {/* Ring + Digits */}
      <div className="relative flex items-center justify-center w-72 h-72 sm:w-80 sm:h-80">
        <svg
          className="absolute w-full h-full -rotate-90 pointer-events-none"
          viewBox="0 0 320 320"
          style={{ filter: `drop-shadow(0 0 24px ${glowColor})` }}
        >
          {/* Track */}
          <circle
            cx="160" cy="160" r="140"
            fill="none"
            strokeWidth="3"
            className="stroke-white/8"
          />
          {/* Progress */}
          <motion.circle
            cx="160" cy="160" r="140"
            fill="none"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.6, ease: "linear" }}
            style={{
              stroke: urgency > 0
                ? `rgba(239,68,68,${0.7 + urgency * 0.3})`
                : "rgba(139,92,246,0.85)",
            }}
          />
          {/* Dot at progress head */}
          {progress > 0 && progress < 100 && (
            <motion.circle
              r="4"
              fill={urgency > 0 ? "rgb(239,68,68)" : "rgb(167,139,250)"}
              animate={{
                cx: 160 + 140 * Math.sin((progress / 100) * 2 * Math.PI),
                cy: 160 - 140 * Math.cos((progress / 100) * 2 * Math.PI),
              }}
              transition={{ duration: 0.6, ease: "linear" }}
            />
          )}
        </svg>

        {/* Clickable digit area */}
        <motion.div
          {...breatheVariants}
          className="relative z-10 flex flex-col items-center group cursor-pointer"
          onClick={!isActive ? onEditClick : undefined}
          onWheel={handleWheel}
          data-testid="timer-display-digits"
          title={isActive ? undefined : "Click to edit duration"}
        >
          <motion.span
            key={timeLeft}
            className={cn(
              "font-mono font-thin tabular-nums tracking-tighter drop-shadow-md select-none",
              "text-[5.5rem] sm:text-[6.5rem] leading-none text-white"
            )}
          >
            {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
          </motion.span>

          {/* "Click to edit" hint */}
          {!isActive && (
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute -bottom-7 flex items-center gap-1 text-white/30 text-xs pointer-events-none"
            >
              <Edit2 className="w-3 h-3" />
              <span>click to edit</span>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Plus button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.93 }}
        onMouseDown={() => startHold(60)}
        onMouseUp={stopHold}
        onMouseLeave={stopHold}
        onTouchStart={() => startHold(60)}
        onTouchEnd={stopHold}
        disabled={isActive}
        data-testid="button-adjust-plus"
        className={cn(
          "w-11 h-11 rounded-full flex items-center justify-center border border-white/10 bg-white/5 transition-all",
          isActive
            ? "opacity-0 pointer-events-none"
            : "opacity-100 hover:bg-white/12 hover:border-white/20 text-white/60 hover:text-white"
        )}
      >
        <Plus className="w-4 h-4" />
      </motion.button>
    </div>
  );
}
