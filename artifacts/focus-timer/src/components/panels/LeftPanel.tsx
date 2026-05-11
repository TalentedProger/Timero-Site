import React from "react";
import { motion } from "framer-motion";
import { X, Image as ImageIcon, Volume2, Play, Shuffle } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";
import { backgrounds } from "@/lib/backgrounds";
import { playSound } from "@/lib/sounds";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LeftPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const animationOptions = [
  { id: "none", label: "None" },
  { id: "pulse", label: "Pulse" },
  { id: "breathe", label: "Breathe" },
  { id: "ripple", label: "Ripple" },
];

const soundOptions = [
  { id: "bell", label: "Bell" },
  { id: "chime", label: "Chime" },
  { id: "gong", label: "Gong" },
  { id: "rain", label: "Rain" },
  { id: "birds", label: "Birds" },
  { id: "sine", label: "Sine" },
];

export function LeftPanel({ isOpen, onClose }: LeftPanelProps) {
  const { settings, setSettings } = useSettings();

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: isOpen ? 0 : "-100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed inset-y-0 left-0 w-80 sm:w-96 glass-panel z-50 flex flex-col"
    >
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <h2 className="text-xl font-medium text-white/90">Appearance</h2>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition-colors">
          <X className="w-5 h-5 text-white/70" />
        </button>
      </div>

      <ScrollArea className="flex-1 p-6">
        <div className="space-y-8">
          {/* Backgrounds */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-white/70 uppercase tracking-wider flex items-center gap-2">
                <ImageIcon className="w-4 h-4" /> Background
              </h3>
              <button
                onClick={() => {
                  const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)].id;
                  setSettings({ selectedBackground: randomBg });
                }}
                className="text-xs text-primary hover:text-primary-foreground transition-colors flex items-center gap-1"
              >
                <Shuffle className="w-3 h-3" /> Random
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {backgrounds.map((bg) => (
                <button
                  key={bg.id}
                  onClick={() => setSettings({ selectedBackground: bg.id })}
                  className={cn(
                    "relative aspect-video rounded-lg overflow-hidden border-2 transition-all",
                    settings.selectedBackground === bg.id
                      ? "border-primary shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                      : "border-transparent hover:border-white/20"
                  )}
                >
                  <img src={bg.url} alt={bg.name} className="object-cover w-full h-full opacity-80 hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 bg-black/20" />
                  <span className="absolute bottom-1 left-2 text-[10px] font-medium text-white/90">{bg.name}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Animation Style */}
          <section className="space-y-4">
            <h3 className="text-sm font-medium text-white/70 uppercase tracking-wider">Animation</h3>
            <div className="flex flex-wrap gap-2">
              {animationOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSettings({ animationStyle: opt.id as any })}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-sm transition-colors",
                    settings.animationStyle === opt.id
                      ? "bg-primary text-white"
                      : "bg-white/5 text-white/60 hover:bg-white/10"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </section>

          {/* Sounds */}
          <section className="space-y-4">
            <h3 className="text-sm font-medium text-white/70 uppercase tracking-wider flex items-center gap-2">
              <Volume2 className="w-4 h-4" /> Sound
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Volume2 className="w-4 h-4 text-white/50" />
                <Slider
                  value={[settings.volume]}
                  onValueChange={([val]) => setSettings({ volume: val })}
                  max={100}
                  step={1}
                  className="flex-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                {soundOptions.map((opt) => (
                  <div
                    key={opt.id}
                    className={cn(
                      "flex items-center justify-between p-2 rounded-lg border transition-colors",
                      settings.selectedSound === opt.id
                        ? "border-primary bg-primary/10"
                        : "border-white/5 bg-white/5 hover:border-white/10"
                    )}
                  >
                    <button
                      className="flex-1 text-left text-sm text-white/80"
                      onClick={() => setSettings({ selectedSound: opt.id })}
                    >
                      {opt.label}
                    </button>
                    <button
                      onClick={() => playSound(opt.id, settings.volume)}
                      className="p-1.5 rounded-md hover:bg-white/10 text-white/50 hover:text-white"
                    >
                      <Play className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </ScrollArea>
    </motion.div>
  );
}
