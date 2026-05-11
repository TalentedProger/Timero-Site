import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TimerDisplayProps {
  timeLeft: number;
  duration: number;
  isActive: boolean;
  animationStyle: string;
}

export function TimerDisplay({ timeLeft, duration, isActive, animationStyle }: TimerDisplayProps) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  const progress = duration > 0 ? ((duration - timeLeft) / duration) * 100 : 0;
  
  const circumference = 2 * Math.PI * 140;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  let animationClass = "";
  if (isActive) {
    if (animationStyle === "pulse") animationClass = "animate-pulse";
    if (animationStyle === "breathe") animationClass = "animate-pulse duration-3000";
    if (animationStyle === "ripple") animationClass = "animate-ping";
  }

  return (
    <div className="relative flex items-center justify-center w-80 h-80 sm:w-96 sm:h-96">
      <svg
        className="absolute w-full h-full transform -rotate-90 pointer-events-none drop-shadow-[0_0_60px_rgba(139,92,246,0.3)]"
        viewBox="0 0 320 320"
      >
        {/* Background Ring */}
        <circle
          cx="160"
          cy="160"
          r="140"
          fill="none"
          className="stroke-white/10"
          strokeWidth="6"
        />
        {/* Progress Ring */}
        <motion.circle
          cx="160"
          cy="160"
          r="140"
          fill="none"
          className="stroke-primary"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.5, ease: "linear" }}
        />
      </svg>
      
      <div className={cn("z-10 flex flex-col items-center justify-center", animationClass)}>
        <motion.span 
          layoutId="timer-digits"
          className="text-7xl sm:text-9xl font-mono font-extralight tracking-tighter text-white tabular-nums drop-shadow-md"
        >
          {formattedTime}
        </motion.span>
      </div>
    </div>
  );
}
