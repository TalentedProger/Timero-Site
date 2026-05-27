import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSettings } from "@/hooks/useSettings";
import { getT } from "@/lib/i18n";

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
  const t = getT(settings.language);

  const totalHours = Math.floor(timeLeft / 3600);
  const totalMins = Math.floor((timeLeft % 3600) / 60);
  const secs = timeLeft % 60;

  const showHours = duration >= 3600;
  const formattedTime = showHours
    ? `${totalHours}:${totalMins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    : `${totalMins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;

  const charCount = formattedTime.length;
  const fontClass =
    charCount <= 5
      ? "text-[4rem] sm:text-[5.5rem] md:text-[6.5rem]"
      : charCount <= 7
      ? "text-[3rem] sm:text-[3.8rem] md:text-[5rem]"
      : "text-[2.5rem] sm:text-[3rem] md:text-[3.8rem]";

  // Ring geometry — SVG viewBox is 320×320, center 160×160, radius 140
  const CX = 160;
  const CY = 160;
  const R = 140;
  const circumference = 2 * Math.PI * R;

  const progress = duration > 0 ? ((duration - timeLeft) / duration) * 100 : 0;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const strokeColor = accent;
  const glowColor = `${accent}66`;

  // Dot position — SVG is CSS-rotated -90deg.
  // Arc starts at SVG 3-o'clock (= visual 12-o'clock after rotation).
  // So angle=0 maps to visual top; increasing angle goes clockwise visually.
  const dotAngle = (progress / 100) * 2 * Math.PI;
  const dotCx = CX + R * Math.cos(dotAngle);
  const dotCy = CY + R * Math.sin(dotAngle);
  const dotColor = accent;

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
                scale: animationStyle === "breathe" ? [1, 1.015, 1] : [1, 1.025, 1],
                transition: {
                  duration: animationStyle === "breathe" 
                    ? (4 * (100 / settings.animationSpeed))
                    : (1.5 * (100 / settings.animationSpeed)),
                  repeat: Infinity,
                  ease: [0.4, 0.0, 0.2, 1],
                },
              }
            : {},
        }
      : {};

  const rippleVariants =
    animationStyle === "ripple"
      ? {
          animate: isActive
            ? {
                scale: [1, 1.02, 0.98, 1],
                opacity: [1, 0.95, 1, 1],
                transition: {
                  duration: 3 * (100 / settings.animationSpeed),
                  repeat: Infinity,
                  ease: [0.45, 0.05, 0.55, 0.95],
                },
              }
            : {},
        }
      : {};

  const isReducedFont = ["dm-sans", "montserrat", "inter"].includes(settings.fontFamily);
  const isPlayfair = settings.fontFamily === "playfair";

  return (
    <div className="flex items-center gap-3 sm:gap-8">
      {/* Minus */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.93 }}
        onPointerDown={(e) => {
          e.preventDefault();
          startHold(-60);
        }}
        onPointerUp={stopHold}
        onPointerLeave={stopHold}
        onPointerCancel={stopHold}
        onContextMenu={(e) => e.preventDefault()}
        disabled={isActive}
        className={cn(
          "w-10 h-10 sm:w-11 sm:h-11 rounded-full inline-flex items-center justify-center border border-white/10 bg-white/5 transition-all flex-shrink-0",
          isActive
            ? "opacity-0 pointer-events-none"
            : "opacity-100 hover:bg-white/12 hover:border-white/20 text-white/60 hover:text-white"
        )}
      >
        <Minus className="w-4 h-4" strokeWidth={2.5} />
      </motion.button>

      {/* Ring + digits */}
      <div className="relative flex items-center justify-center w-64 h-64 sm:w-80 sm:h-80">
        <svg
          className="absolute w-full h-full -rotate-90 pointer-events-none"
          viewBox="0 0 320 320"
          style={{ filter: `drop-shadow(0 0 22px ${glowColor})` }}
        >
          {/* Track ring */}
          <circle
            cx={CX} cy={CY} r={R}
            fill="none"
            strokeWidth="3"
            stroke="rgba(255,255,255,0.07)"
          />
          {/* Progress arc — starts at SVG 3-o'clock = visual 12-o'clock */}
          <motion.circle
            cx={CX} cy={CY} r={R}
            fill="none"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.6, ease: "linear" }}
            style={{ stroke: strokeColor }}
          />
          {/* Leading dot — angle=0 is visual 12-o'clock (SVG 3-o'clock due to -90deg CSS rotation) */}
          {progress > 0 && progress < 100 && (
            <motion.circle
              r="5"
              animate={{ cx: dotCx, cy: dotCy }}
              transition={{ duration: 0.6, ease: "linear" }}
              style={{ fill: dotColor, filter: `drop-shadow(0 0 4px ${dotColor})` }}
            />
          )}
          {/* Start dot at 12-o'clock when no progress */}
          {progress === 0 && (
            <circle
              cx={CX + R}
              cy={CY}
              r="4"
              style={{ fill: `${accent}60` }}
            />
          )}
        </svg>

        {/* Clickable digits */}
        <motion.div
          {...(animationStyle === "ripple" ? rippleVariants : breatheVariants)}
          className="relative z-10 flex flex-col items-center group cursor-pointer"
          onClick={!isActive ? onEditClick : undefined}
          onWheel={handleWheel}
          title={isActive ? undefined : t.clickToEdit}
        >
          <span
            className={cn(
              "font-thin tabular-nums tracking-tighter drop-shadow-md select-none leading-none text-white transition-all duration-300",
              fontClass
            )}
            style={{
              transform: isReducedFont ? "scale(0.96)" : undefined,
              marginTop: isPlayfair ? "-0.15em" : undefined
            }}
          >
            {formattedTime}
          </span>

          {!isActive && (
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute -bottom-7 flex items-center gap-1 text-white/30 text-xs pointer-events-none whitespace-nowrap"
            >
              <span>{t.clickToEdit}</span>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Plus */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.93 }}
        onPointerDown={(e) => {
          e.preventDefault();
          startHold(60);
        }}
        onPointerUp={stopHold}
        onPointerLeave={stopHold}
        onPointerCancel={stopHold}
        onContextMenu={(e) => e.preventDefault()}
        disabled={isActive}
        className={cn(
          "w-10 h-10 sm:w-11 sm:h-11 rounded-full inline-flex items-center justify-center border border-white/10 bg-white/5 transition-all flex-shrink-0",
          isActive
            ? "opacity-0 pointer-events-none"
            : "opacity-100 hover:bg-white/12 hover:border-white/20 text-white/60 hover:text-white"
        )}
      >
        <Plus className="w-4 h-4" strokeWidth={2.5} />
      </motion.button>
    </div>
  );
}
