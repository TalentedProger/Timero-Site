import { motion } from "framer-motion";
import { X, Image as ImageIcon, Volume2, Play, Shuffle, Palette, SunDim } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";
import { backgrounds } from "@/lib/backgrounds";
import { playSound } from "@/lib/sounds";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getT } from "@/lib/i18n";

interface LeftPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SOUND_OPTIONS = [
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
  const accent = settings.accentColor;
  const t = getT(settings.language);

  const animationOptions = [
    { id: "none", label: t.animNone },
    { id: "pulse", label: t.animPulse },
    { id: "breathe", label: t.animBreathe },
    { id: "ripple", label: t.animRipple },
  ];

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: isOpen ? 0 : "-100%" }}
      transition={{ type: "spring", damping: 26, stiffness: 220 }}
      className="fixed inset-y-0 left-0 w-80 sm:w-96 z-50 flex flex-col border-r border-white/8"
      style={{
        background: "rgba(8,8,18,0.75)",
        backdropFilter: "blur(32px)",
        WebkitBackdropFilter: "blur(32px)",
      }}
    >
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
        <h2 className="text-base font-semibold text-white/90 tracking-wide">{t.appearance}</h2>
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
                <ImageIcon className="w-3.5 h-3.5" /> {t.background}
              </h3>
              <button
                onClick={() => {
                  const others = backgrounds.filter((b) => b.id !== settings.selectedBackground);
                  const randomBg = others[Math.floor(Math.random() * others.length)].id;
                  setSettings({ selectedBackground: randomBg });
                }}
                className="text-xs text-white/35 hover:text-white/70 transition-colors flex items-center gap-1"
              >
                <Shuffle className="w-3 h-3" /> {t.random}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {backgrounds.map((bg) => {
                const isActive = settings.selectedBackground === bg.id;
                return (
                  <button
                    key={bg.id}
                    onClick={() => setSettings({ selectedBackground: bg.id })}
                    className="relative aspect-video rounded-xl overflow-hidden transition-all duration-200"
                    style={{
                      border: isActive
                        ? `2px solid ${accent}88`
                        : "2px solid transparent",
                      boxShadow: isActive ? `0 0 12px ${accent}33` : undefined,
                    }}
                  >
                    <img
                      src={bg.url}
                      alt={bg.name}
                      className="object-cover w-full h-full opacity-80 hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-black/20" />
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
              <SunDim className="w-3.5 h-3.5" /> {t.dimming}
            </h3>
            <div className="flex items-center gap-3">
              <SunDim className="w-4 h-4 text-white/25 shrink-0" />
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
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest">{t.animation}</h3>
            <div className="flex flex-wrap gap-2">
              {animationOptions.map((opt) => {
                const isActive = settings.animationStyle === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setSettings({ animationStyle: opt.id as "pulse" | "breathe" | "ripple" | "none" })}
                    className="px-4 py-1.5 rounded-full text-sm transition-all duration-200"
                    style={
                      isActive
                        ? {
                            background: `${accent}22`,
                            border: `1px solid ${accent}55`,
                            color: "white",
                          }
                        : {
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid transparent",
                            color: "rgba(255,255,255,0.5)",
                          }
                    }
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Sound */}
          <section className="space-y-3">
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest flex items-center gap-2">
              <Volume2 className="w-3.5 h-3.5" /> {t.sound}
            </h3>
            <div className="flex items-center gap-3">
              <Volume2 className="w-4 h-4 text-white/25 shrink-0" />
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
              {SOUND_OPTIONS.map((opt) => {
                const isActive = settings.selectedSound === opt.id;
                return (
                  <div
                    key={opt.id}
                    className="flex items-center justify-between px-3 py-2 rounded-xl transition-all"
                    style={{
                      border: isActive
                        ? `1px solid ${accent}44`
                        : "1px solid rgba(255,255,255,0.06)",
                      background: isActive
                        ? `${accent}12`
                        : "rgba(255,255,255,0.03)",
                    }}
                  >
                    <button
                      className="flex-1 text-left text-sm text-white/75"
                      onClick={() => setSettings({ selectedSound: opt.id })}
                    >
                      {opt.label}
                    </button>
                    <button
                      onClick={() => playSound(opt.id, settings.volume)}
                      className="p-1.5 rounded-lg hover:bg-white/10 text-white/35 hover:text-white transition-colors"
                    >
                      <Play className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Palette */}
          <section className="space-y-3">
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest flex items-center gap-2">
              <Palette className="w-3.5 h-3.5" /> {t.accentColor}
            </h3>
            <div className="grid grid-cols-5 gap-3">
              {ACCENT_COLORS.map((color) => {
                const isActive = settings.accentColor === color.hex;
                return (
                  <button
                    key={color.id}
                    onClick={() => setSettings({ accentColor: color.hex })}
                    title={color.label}
                    className="relative w-full aspect-square rounded-xl transition-all duration-200"
                    style={{
                      background: color.hex,
                      transform: isActive ? "scale(1.12)" : "scale(1)",
                      boxShadow: isActive
                        ? `0 0 0 2px rgba(255,255,255,0.7), 0 0 12px ${color.hex}66`
                        : "none",
                    }}
                  >
                    {isActive && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white shadow-md" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-white/22 leading-relaxed">
              Affects timer ring, presets, and controls
            </p>
          </section>

        </div>
      </ScrollArea>
    </motion.div>
  );
}
