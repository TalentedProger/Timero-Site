import { motion } from "framer-motion";
import { X, Image as ImageIcon, Volume2, Play, Shuffle, Palette, SunDim } from "lucide-react";
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

const ACCENT_COLORS = [
  { id: "violet", label: "Violet", hex: "#8b5cf6" },
  { id: "blue", label: "Blue", hex: "#3b82f6" },
  { id: "cyan", label: "Cyan", hex: "#06b6d4" },
  { id: "emerald", label: "Emerald", hex: "#10b981" },
  { id: "rose", label: "Rose", hex: "#f43f5e" },
  { id: "orange", label: "Orange", hex: "#f97316" },
  { id: "amber", label: "Amber", hex: "#f59e0b" },
  { id: "pink", label: "Pink", hex: "#ec4899" },
  { id: "indigo", label: "Indigo", hex: "#6366f1" },
  { id: "teal", label: "Teal", hex: "#14b8a6" },
];

export function LeftPanel({ isOpen, onClose }: LeftPanelProps) {
  const { settings, setSettings } = useSettings();

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: isOpen ? 0 : "-100%" }}
      transition={{ type: "spring", damping: 26, stiffness: 220 }}
      className="fixed inset-y-0 left-0 w-80 sm:w-96 z-50 flex flex-col border-r border-white/8"
      style={{
        background: "rgba(8,8,18,0.72)",
        backdropFilter: "blur(32px)",
        WebkitBackdropFilter: "blur(32px)",
      }}
    >
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
        <h2 className="text-base font-semibold text-white/90 tracking-wide">Appearance</h2>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/50 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <ScrollArea className="flex-1">
        <div className="px-6 py-5 space-y-8">

          {/* Backgrounds */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest flex items-center gap-2">
                <ImageIcon className="w-3.5 h-3.5" /> Background
              </h3>
              <button
                onClick={() => {
                  const others = backgrounds.filter((b) => b.id !== settings.selectedBackground);
                  const randomBg = others[Math.floor(Math.random() * others.length)].id;
                  setSettings({ selectedBackground: randomBg });
                }}
                className="text-xs text-white/40 hover:text-white/70 transition-colors flex items-center gap-1"
              >
                <Shuffle className="w-3 h-3" /> Random
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {backgrounds.map((bg) => {
                const isActive = settings.selectedBackground === bg.id;
                return (
                  <button
                    key={bg.id}
                    onClick={() => setSettings({ selectedBackground: bg.id })}
                    data-testid={`bg-${bg.id}`}
                    className={cn(
                      "relative aspect-video rounded-xl overflow-hidden border-2 transition-all duration-200",
                      isActive
                        ? "border-white/40 shadow-[0_0_12px_rgba(255,255,255,0.15)]"
                        : "border-transparent hover:border-white/15"
                    )}
                  >
                    <img
                      src={bg.url}
                      alt={bg.name}
                      className="object-cover w-full h-full opacity-80 hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    {isActive && (
                      <div className="absolute inset-0 border-2 border-white/30 rounded-xl" />
                    )}
                    <span className="absolute bottom-1 left-2 text-[10px] font-medium text-white/90">
                      {bg.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Background Dim */}
          <section className="space-y-3">
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest flex items-center gap-2">
              <SunDim className="w-3.5 h-3.5" /> Dimming
            </h3>
            <div className="flex items-center gap-3">
              <SunDim className="w-4 h-4 text-white/30 shrink-0" />
              <Slider
                value={[settings.backgroundDim]}
                onValueChange={([val]) => setSettings({ backgroundDim: val })}
                min={0}
                max={85}
                step={1}
                className="flex-1"
              />
              <span className="text-xs text-white/30 w-8 text-right">{settings.backgroundDim}%</span>
            </div>
          </section>

          {/* Animation */}
          <section className="space-y-3">
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest">Animation</h3>
            <div className="flex flex-wrap gap-2">
              {animationOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSettings({ animationStyle: opt.id as "pulse" | "breathe" | "ripple" | "none" })}
                  data-testid={`anim-${opt.id}`}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-sm transition-all",
                    settings.animationStyle === opt.id
                      ? "text-white border border-white/30 bg-white/10"
                      : "bg-white/5 text-white/50 border border-transparent hover:bg-white/8 hover:text-white/70"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </section>

          {/* Sound */}
          <section className="space-y-3">
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest flex items-center gap-2">
              <Volume2 className="w-3.5 h-3.5" /> Sound
            </h3>
            <div className="flex items-center gap-3">
              <Volume2 className="w-4 h-4 text-white/30 shrink-0" />
              <Slider
                value={[settings.volume]}
                onValueChange={([val]) => setSettings({ volume: val })}
                max={100}
                step={1}
                className="flex-1"
              />
              <span className="text-xs text-white/30 w-8 text-right">{settings.volume}%</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {soundOptions.map((opt) => (
                <div
                  key={opt.id}
                  data-testid={`sound-${opt.id}`}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 rounded-xl border transition-all",
                    settings.selectedSound === opt.id
                      ? "border-white/25 bg-white/8"
                      : "border-white/5 bg-white/3 hover:border-white/10"
                  )}
                >
                  <button
                    className="flex-1 text-left text-sm text-white/75"
                    onClick={() => setSettings({ selectedSound: opt.id })}
                  >
                    {opt.label}
                  </button>
                  <button
                    onClick={() => playSound(opt.id, settings.volume)}
                    className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-colors"
                  >
                    <Play className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Palette */}
          <section className="space-y-3">
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest flex items-center gap-2">
              <Palette className="w-3.5 h-3.5" /> Accent Color
            </h3>
            <div className="grid grid-cols-5 gap-2.5">
              {ACCENT_COLORS.map((color) => {
                const isActive = settings.accentColor === color.hex;
                return (
                  <button
                    key={color.id}
                    onClick={() => setSettings({ accentColor: color.hex })}
                    data-testid={`color-${color.id}`}
                    title={color.label}
                    className={cn(
                      "relative w-full aspect-square rounded-xl transition-all duration-200",
                      isActive
                        ? "ring-2 ring-white/60 ring-offset-2 ring-offset-transparent scale-110"
                        : "hover:scale-105 hover:ring-1 hover:ring-white/20"
                    )}
                    style={{ background: color.hex }}
                  >
                    {isActive && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white shadow" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-white/25">
              Affects timer ring, presets, and controls
            </p>
          </section>

        </div>
      </ScrollArea>
    </motion.div>
  );
}
