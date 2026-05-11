import React from "react";
import { Settings, BarChart2, Palette, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomDockProps {
  onToggleLeft: () => void;
  onToggleRight: () => void;
  onToggleMinimal: () => void;
  isLeftOpen: boolean;
  isRightOpen: boolean;
}

export function BottomDock({ onToggleLeft, onToggleRight, onToggleMinimal, isLeftOpen, isRightOpen }: BottomDockProps) {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
      <div className="glass-panel rounded-full px-4 py-3 flex items-center gap-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)] border-white/20">
        <button
          onClick={onToggleLeft}
          className={cn(
            "p-2 rounded-full transition-all duration-300 hover:bg-white/10 group",
            isLeftOpen ? "bg-white/20 text-white" : "text-white/60"
          )}
        >
          <Palette className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>

        <button
          onClick={onToggleMinimal}
          className="p-2 rounded-full transition-all duration-300 hover:bg-white/10 text-white/60 group"
        >
          <Maximize2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>

        <button
          onClick={onToggleRight}
          className={cn(
            "p-2 rounded-full transition-all duration-300 hover:bg-white/10 group",
            isRightOpen ? "bg-white/20 text-white" : "text-white/60"
          )}
        >
          <BarChart2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </div>
  );
}
