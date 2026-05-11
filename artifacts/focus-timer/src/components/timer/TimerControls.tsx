import React from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TimerControlsProps {
  isActive: boolean;
  timeLeft: number;
  duration: number;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export function TimerControls({ isActive, timeLeft, duration, onStart, onPause, onReset }: TimerControlsProps) {
  return (
    <div className="flex items-center justify-center gap-6 mt-8 z-10">
      <Button
        variant="ghost"
        size="icon"
        onClick={onReset}
        disabled={timeLeft === duration && !isActive}
        className={cn(
          "w-14 h-14 rounded-full glass-panel hover:bg-white/20 transition-all",
          (timeLeft === duration && !isActive) && "opacity-50 cursor-not-allowed"
        )}
      >
        <RotateCcw className="w-6 h-6 text-white/80" />
      </Button>

      <Button
        variant="default"
        size="icon"
        onClick={isActive ? onPause : onStart}
        className={cn(
          "w-20 h-20 rounded-full shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:shadow-[0_0_45px_rgba(139,92,246,0.6)] transition-all bg-primary hover:bg-primary/90"
        )}
      >
        {isActive ? (
          <Pause className="w-8 h-8 text-white fill-white" />
        ) : (
          <Play className="w-8 h-8 text-white fill-white ml-1" />
        )}
      </Button>
    </div>
  );
}
