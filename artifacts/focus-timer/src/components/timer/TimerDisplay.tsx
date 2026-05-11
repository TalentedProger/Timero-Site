import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Minus, Plus, Edit2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSettings } from "@/hooks/useSettings";

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
  const { settings } = useSettings();
  const accent = settings.accentColor;

  const totalHours = Math.floor(timeLeft / 3600);
  const totalMins = Math.floor((timeLeft % 3600) / 60);
  const secs = timeLeft % 60;

  // Show hours format when the session duration is >= 1 hour
  const showHours = duration >= 3600;
  const formattedTime = showHours
    ? `${totalHours}:${totalMins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    : `${totalMins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;

  // Dynamic font size based on character count
  const charCount = formattedTime.length;
  const fontClass =
    charCount <= 5
      ? "text-[5.5rem] sm:text-[6.5rem]"
      : charCount <= 7
      ? "text-[3.8rem] sm:text-[5rem]"
      : "text-[3rem] sm:text-[3.8rem]";

  // Ring dimensions — slightly larger when showing hours to give more breathing room
  const ringR = showHours ? 128 : 140;
  const ringSize = showHours ? 280 : 300;

  const progress = duration > 0 ? ((duration - timeLeft) / duration) * 100 : 0;
  const circumference = 2 * Math.PI * ringR;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Urgency glow when < 20% remaining
  const urgency = progress > 80 ? (progress - 80) / 20 : 0;
  const strokeColor =
    urgency > 0 ? `rgba(239,68,68,${0.7 + urgency * 0.3})` : accent;
  const glowColor =
    urgency > 0
      ? `rgba(239,68,68,${0.2 + urgency * 0.35})`
      : `${accent}55`;

  // Hold-to-adjust
  const holdRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const holdCountRef = useRef(0);

  const startHold = useCallback(
    (delta: number) => {
      if (isActive) return;
      holdCountRef.current = 0;
      onAdjust(delta);
      holdRef.current = setInterval(() => {
        holdCountRef.current += 1;
        const speed = holdCountRef.current > 12 ? 5 * 60 : 60;
        onAdjust(delta > 0 ? speed : -speed);
      }, 150);
    },
    [isActive, onAdjust]
  );

  const stopHold = useCallback(() => {
    if (holdRef.current) {
      clearInterval(holdRef.current);
      holdRef.current = null;
    }
  }, []);

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (isActive) return;
      e.preventDefault();
      onAdjust(e.deltaY > 0 ? -60 : 60);
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

  const containerSize = showHours ? "w-72 h-72 sm:w-80 sm:h-80" : "w-72 h-72 sm:w-80 sm:h-80";
  const viewBox = `0 0 ${ringSize} ${ringSize}`;
  const cx = ringSize / 2;
  const cy = ringSize / 2;

  return (
    <div className="flex items-center gap-4 sm:gap-8">
      {/* Minus */}
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

      {/* Ring + digits */}
      <div className={cn("relative flex items-center justify-center", containerSize)}>
        <svg
          className="absolute w-full h-full -rotate-90 pointer-events-none"
          viewBox={viewBox}
          style={{ filter: `drop-shadow(0 0 20px ${glowColor})` }}
        >
          {/* Track */}
          <circle
            cx={cx} cy={cy} r={ringR}
            fill="none"
            strokeWidth="3"
            stroke="rgba(255,255,255,0.08)"
          />
          {/* Progress */}
          <motion.circle
            cx={cx} cy={cy} r={ringR}
            fill="none"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.6, ease: "linear" }}
            style={{ stroke: strokeColor }}
          />
          {/* Head dot */}
          {progress > 0 && progress < 100 && (
            <motion.circle
              r="4"
              style={{ fill: urgency > 0 ? "rgb(239,68,68)" : accent }}
              animate={{
                cx: cx + ringR * Math.sin((progress / 100) * 2 * Math.PI),
                cy: cy - ringR * Math.cos((progress / 100) * 2 * Math.PI),
              }}
              transition={{ duration: 0.6, ease: "linear" }}
            />
          )}
        </svg>

        {/* Digits */}
        <motion.div
          {...breatheVariants}
          className="relative z-10 flex flex-col items-center group cursor-pointer"
          onClick={!isActive ? onEditClick : undefined}
          onWheel={handleWheel}
          data-testid="timer-display-digits"
          title={isActive ? undefined : "Click to edit duration"}
        >
          <span
            className={cn(
              "font-mono font-thin tabular-nums tracking-tighter drop-shadow-md select-none leading-none text-white transition-all duration-300",
              fontClass
            )}
          >
            {formattedTime}
          </span>

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

      {/* Plus */}
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
