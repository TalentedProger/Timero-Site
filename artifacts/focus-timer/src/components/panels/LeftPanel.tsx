import { useState } from "react";
import { motion } from "framer-motion";
import { X, Image as ImageIcon, Play, ChevronRight, Palette, Type } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";
import { backgrounds } from "@/lib/backgrounds";
import { playSound } from "@/lib/sounds";
import { AccentSlider } from "@/components/ui/accent-slider";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getT } from "@/lib/i18n";
import { FONTS } from "@/lib/fonts";
import { BackgroundGallery } from "./BackgroundGallery";

interface LeftPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SOUND_OPTIONS = [
  { id: "bell",  label: "Bell" },
  { id: "chime", label: "Chime" },
  { id: "gong",  label: "Gong" },
  { id: "rain",  label: "Rain" },
  { id: "birds", label: "Birds" },
  { id: "sine",  label: "Sine" },
];

const ACCENT_COLORS = [
  { id: "violet",  hex: "#8b5cf6" },
  { id: "blue",    hex: "#3b82f6" },
  { id: "cyan",    hex: "#06b6d4" },
  { id: "emerald", hex: "#10b981" },
  { id: "rose",    hex: "#f43f5e" },
  { id: "orange",  hex: "#f97316" },
  { id: "amber",   hex: "#f59e0b" },
  { id: "pink",    hex: "#ec4899" },
  { id: "indigo",  hex: "#6366f1" },
  { id: "teal",    hex: "#14b8a6" },
];

export function LeftPanel({ isOpen, onClose }: LeftPanelProps) {
  const { settings, setSettings } = useSettings();
  const accent = settings.accentColor;
  const t = getT(settings.language);
  const [galleryOpen, setGalleryOpen] = useState(false);

  const animationOptions = [
    { id: "none",    label: t.animNone },
    { id: "pulse",   label: t.animPulse },
    { id: "breathe", label: t.animBreathe },
    { id: "ripple",  label: t.animRipple },
  ];

  // Resolve current bg (including custom)
  const currentBg = settings.selectedBackground === "custom"
    ? { id: "custom", name: "Custom", url: settings.customBackgroundUrl ?? "", category: "abstract" as const }
    : backgrounds.find((b) => b.id === settings.selectedBackground);

  // Show current bg first, then next 3 others (4 total, 2-col grid)
  const previewBgs = [
    ...(currentBg ? [currentBg] : []),
    ...backgrounds.filter((b) => b.id !== settings.selectedBackground).slice(0, 3),
  ];

  return (
    <>
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
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/50 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <ScrollArea className="flex-1">
          <div className="px-6 py-5 space-y-8">

            {/* ── Background ── */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest flex items-center gap-2">
                  <ImageIcon className="w-3.5 h-3.5" /> {t.background}
                </h3>
                <button
                  onClick={() => setGalleryOpen(true)}
                  className="flex items-center gap-1 text-xs text-white/40 hover:text-white/70 transition-colors"
                >
                  {t.allBackgrounds} <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              {/* 2-column grid, larger cards */}
              <div className="grid grid-cols-2 gap-2.5">
                {previewBgs.map((bg) => {
                  const isActive = settings.selectedBackground === bg.id;
                  return (
                    <button
                      key={bg.id}
                      onClick={() => setSettings({ selectedBackground: bg.id })}
                      className="relative aspect-video rounded-2xl overflow-hidden transition-all duration-200"
                      style={{
                        border: isActive ? `2px solid ${accent}99` : "2px solid rgba(255,255,255,0.07)",
                        boxShadow: isActive ? `0 0 14px ${accent}44` : undefined,
                      }}
                    >
                      <img
                        src={bg.url}
                        alt={bg.name}
                        className="object-cover w-full h-full opacity-80 hover:opacity-100 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-black/20" />
                      <span className="absolute bottom-1.5 left-2 text-[10px] font-medium text-white/90 drop-shadow">
                        {bg.name}
                      </span>
                      {isActive && (
                        <div
                          className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ background: accent }}
                        >
                          <svg viewBox="0 0 10 8" className="w-2.5 h-2.5 fill-white">
                            <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* ── Dimming ── */}
            <section className="space-y-3">
              <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest">{t.dimming}</h3>
              <div className="flex items-center gap-3">
                <AccentSlider
                  value={[settings.backgroundDim]}
                  onValueChange={([val]) => setSettings({ backgroundDim: val })}
                  min={0} max={85} step={1}
                  accent={accent}
                  className="flex-1"
                />
                <span className="text-xs text-white/30 w-8 text-right tabular-nums">{settings.backgroundDim}%</span>
              </div>
            </section>

            {/* ── Sound ── */}
            <section className="space-y-3">
              <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest">{t.sound}</h3>
              
              {/* Volume */}
              <div className="space-y-2">
                <span className="text-[10px] font-semibold text-white/30 uppercase tracking-widest">Громкость</span>
                <div className="flex items-center gap-3">
                  <AccentSlider
                    value={[settings.volume]}
                    onValueChange={([val]) => setSettings({ volume: val })}
                    min={0} max={100} step={1}
                    accent={accent}
                    className="flex-1"
                  />
                  <span className="text-xs text-white/30 w-8 text-right tabular-nums">{settings.volume}%</span>
                </div>
              </div>

              {/* Repeat Count */}
              <div className="space-y-2">
                <span className="text-[10px] font-semibold text-white/30 uppercase tracking-widest">Кол-во повторений</span>
                <div className="flex items-center gap-3">
                  <AccentSlider
                    value={[settings.soundRepeatCount]}
                    onValueChange={([val]) => setSettings({ soundRepeatCount: val })}
                    min={1} max={10} step={1}
                    accent={accent}
                    className="flex-1"
                  />
                  <span className="text-xs text-white/30 w-8 text-right tabular-nums">{settings.soundRepeatCount}</span>
                </div>
              </div>

              {/* Play Duration */}
              <div className="space-y-2">
                <span className="text-[10px] font-semibold text-white/30 uppercase tracking-widest">Время проигрывания (сек)</span>
                <div className="flex items-center gap-3">
                  <AccentSlider
                    value={[settings.soundPlayDuration]}
                    onValueChange={([val]) => setSettings({ soundPlayDuration: val })}
                    min={1} max={10} step={0.5}
                    accent={accent}
                    className="flex-1"
                  />
                  <span className="text-xs text-white/30 w-8 text-right tabular-nums">{settings.soundPlayDuration}s</span>
                </div>
              </div>

              {/* Sound Options */}
              <div className="grid grid-cols-2 gap-2">
                {SOUND_OPTIONS.map((opt) => {
                  const isActive = settings.selectedSound === opt.id;
                  return (
                    <div
                      key={opt.id}
                      className="flex items-center justify-between px-3 py-2 rounded-xl transition-all"
                      style={{
                        border: isActive ? `1px solid ${accent}44` : "1px solid rgba(255,255,255,0.06)",
                        background: isActive ? `${accent}10` : "rgba(255,255,255,0.03)",
                      }}
                    >
                      <button
                        className="flex-1 text-left text-sm text-white/75"
                        onClick={() => setSettings({ selectedSound: opt.id })}
                      >
                        {opt.label}
                      </button>
                      <button
                        onClick={() => playSound(opt.id, settings.volume, 1, 1)}
                        className="p-1.5 rounded-lg hover:bg-white/10 text-white/35 hover:text-white transition-colors"
                      >
                        <Play className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ── Animation ── */}
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
                          ? { background: `${accent}22`, border: `1px solid ${accent}55`, color: "white" }
                          : { background: "rgba(255,255,255,0.05)", border: "1px solid transparent", color: "rgba(255,255,255,0.45)" }
                      }
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
              
              {/* Animation Speed */}
              {settings.animationStyle !== "none" && (
                <div className="space-y-2 pt-1">
                  <span className="text-[10px] font-semibold text-white/30 uppercase tracking-widest">Скорость анимации</span>
                  <div className="flex items-center gap-3">
                    <AccentSlider
                      value={[settings.animationSpeed]}
                      onValueChange={([val]) => setSettings({ animationSpeed: val })}
                      min={10} max={100} step={5}
                      accent={accent}
                      className="flex-1"
                    />
                    <span className="text-xs text-white/30 w-8 text-right tabular-nums">{settings.animationSpeed}%</span>
                  </div>
                </div>
              )}
            </section>

            {/* ── Accent Color ── */}
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
                      className="relative w-full aspect-square rounded-xl transition-all duration-200"
                      style={{
                        background: color.hex,
                        transform: isActive ? "scale(1.12)" : "scale(1)",
                        boxShadow: isActive
                          ? `0 0 0 2px rgba(255,255,255,0.65), 0 0 14px ${color.hex}66`
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
            </section>

            {/* ── Font ── */}
            <section className="space-y-3">
              <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest flex items-center gap-2">
                <Type className="w-3.5 h-3.5" /> {t.font}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {FONTS.map((font) => {
                  const isActive = settings.fontFamily === font.id;
                  return (
                    <button
                      key={font.id}
                      onClick={() => setSettings({ fontFamily: font.id })}
                      className={cn("flex flex-col items-start px-3.5 py-3 rounded-xl transition-all duration-200 text-left")}
                      style={
                        isActive
                          ? { background: `${accent}18`, border: `1px solid ${accent}50` }
                          : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }
                      }
                    >
                      <span
                        className="text-xl font-medium text-white/85 leading-tight mb-0.5"
                        style={{ fontFamily: font.css }}
                      >
                        Aa
                      </span>
                      <span className="text-[11px] text-white/40">{font.name}</span>
                    </button>
                  );
                })}
              </div>
            </section>

          </div>
        </ScrollArea>
      </motion.div>

      <BackgroundGallery
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
      />
    </>
  );
}
