import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Plus, Minus, Clock } from "lucide-react";
import { useHistory } from "@/hooks/useHistory";
import { useSettings } from "@/hooks/useSettings";
import { cn } from "@/lib/utils";

interface TimePickerPanelProps {
  isOpen: boolean;
  currentDuration: number;
  onConfirm: (seconds: number) => void;
  onClose: () => void;
}

const ITEM_H = 60;
const VISIBLE = 5;
const PADDING = Math.floor(VISIBLE / 2);

const PRESET_TEMPLATES = [
  { label: "Pomodoro", seconds: 25 * 60 },
  { label: "Deep Work", seconds: 90 * 60 },
  { label: "Study", seconds: 45 * 60 },
  { label: "Meditation", seconds: 20 * 60 },
  { label: "Workout", seconds: 30 * 60 },
];

const QUICK_ADDS = [
  { label: "+5m", delta: 5 * 60 },
  { label: "+15m", delta: 15 * 60 },
  { label: "+30m", delta: 30 * 60 },
];

function formatDuration(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  if (h > 0 && m > 0) return `${h}h ${m}m`;
  if (h > 0) return `${h}h`;
  return `${m}m`;
}

function WheelPicker({
  value,
  max,
  onChange,
  label,
}: {
  value: number;
  max: number;
  onChange: (v: number) => void;
  label: string;
}) {
  const { settings } = useSettings();
  const accent = settings.accentColor;

  const containerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const items = Array.from({ length: max + 1 }, (_, i) => i);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTop = (PADDING + value) * ITEM_H;
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || isScrolling.current) return;
    el.scrollTo({ top: (PADDING + value) * ITEM_H, behavior: "smooth" });
  }, [value]);

  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    isScrolling.current = true;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const raw = Math.round(el.scrollTop / ITEM_H) - PADDING;
      const clamped = Math.max(0, Math.min(max, raw));
      onChange(clamped);
      isScrolling.current = false;
    }, 80);
  }, [max, onChange]);

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-[10px] font-semibold text-white/30 uppercase tracking-widest">{label}</span>
      <div className="relative" style={{ height: VISIBLE * ITEM_H, width: 88 }}>
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/50 to-transparent z-10 pointer-events-none rounded-t-xl" />
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black/50 to-transparent z-10 pointer-events-none rounded-b-xl" />
        <div
          className="absolute inset-x-0 z-20 pointer-events-none rounded-lg"
          style={{
            top: PADDING * ITEM_H,
            height: ITEM_H,
            background: `${accent}14`,
            border: `1px solid ${accent}30`,
          }}
        />
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="overflow-y-scroll h-full"
          style={{ scrollSnapType: "y mandatory", scrollbarWidth: "none" }}
        >
          {Array(PADDING).fill(null).map((_, i) => (
            <div key={`pt${i}`} style={{ height: ITEM_H, scrollSnapAlign: "center" }} />
          ))}
          {items.map((item) => {
            const isSelected = item === value;
            return (
              <div
                key={item}
                onClick={() => {
                  onChange(item);
                  const el = containerRef.current;
                  if (el) el.scrollTo({ top: (PADDING + item) * ITEM_H, behavior: "smooth" });
                }}
                style={{ height: ITEM_H, scrollSnapAlign: "center" }}
                className={cn(
                  "flex items-center justify-center cursor-pointer transition-all duration-150 select-none tabular-nums font-mono font-thin",
                  isSelected
                    ? "text-white text-4xl"
                    : "text-white/22 text-2xl hover:text-white/40"
                )}
              >
                {item.toString().padStart(2, "0")}
              </div>
            );
          })}
          {Array(PADDING).fill(null).map((_, i) => (
            <div key={`pb${i}`} style={{ height: ITEM_H, scrollSnapAlign: "center" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function TimePickerPanel({ isOpen, currentDuration, onConfirm, onClose }: TimePickerPanelProps) {
  const { history } = useHistory();
  const { settings } = useSettings();
  const accent = settings.accentColor;

  const [hours, setHours] = useState(Math.floor(currentDuration / 3600));
  const [minutes, setMinutes] = useState(() => {
    const m = Math.floor((currentDuration % 3600) / 60);
    return m === 0 && Math.floor(currentDuration / 3600) === 0 ? 25 : m;
  });

  useEffect(() => {
    if (isOpen) {
      setHours(Math.floor(currentDuration / 3600));
      setMinutes(Math.floor((currentDuration % 3600) / 60));
    }
  }, [isOpen, currentDuration]);

  const totalSeconds = hours * 3600 + minutes * 60;

  const handleQuickAdd = (delta: number) => {
    const newTotal = Math.max(60, totalSeconds + delta);
    setHours(Math.floor(newTotal / 3600));
    setMinutes(Math.floor((newTotal % 3600) / 60));
  };

  const handlePreset = (seconds: number) => {
    setHours(Math.floor(seconds / 3600));
    setMinutes(Math.floor((seconds % 3600) / 60));
  };

  // Unique recent durations from history
  const recentTimers = Array.from(
    new Map(
      history
        .filter((s) => s.duration >= 60)
        .map((s) => {
          const secs = Math.round(s.duration / 60) * 60;
          return [secs, secs];
        })
    ).values()
  ).slice(0, 5);

  const handleConfirm = () => {
    if (totalSeconds < 60) return;
    onConfirm(totalSeconds);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="tp-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40"
            style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(4px)" }}
          />
          <motion.div
            key="tp-panel"
            initial={{ opacity: 0, scale: 0.93, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 16 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="fixed z-50 inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 top-1/2 -translate-y-1/2 w-full sm:w-[440px]"
          >
            <div
              className="rounded-3xl border border-white/10 overflow-hidden"
              style={{
                background: "rgba(8,8,20,0.72)",
                backdropFilter: "blur(48px)",
                WebkitBackdropFilter: "blur(48px)",
                boxShadow: "0 32px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07)",
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-5 pb-1">
                <div className="flex items-center gap-2 text-white/45">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium tracking-wide">Set Duration</span>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full hover:bg-white/8 transition-colors text-white/40 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Wheels */}
              <div className="flex items-center justify-center gap-4 px-6 py-3">
                <WheelPicker value={hours} max={23} onChange={setHours} label="Hours" />
                <div className="text-4xl font-thin text-white/30 pb-4 select-none">:</div>
                <WheelPicker value={minutes} max={59} onChange={setMinutes} label="Minutes" />
              </div>

              {/* Total label */}
              <div className="text-center pb-3">
                <span className="text-xs font-medium" style={{ color: `${accent}99` }}>
                  {formatDuration(totalSeconds)}
                </span>
              </div>

              <div className="h-px bg-white/6 mx-6" />

              {/* Quick add */}
              <div className="px-6 py-4 space-y-2.5">
                <p className="text-[10px] font-semibold text-white/30 uppercase tracking-widest">Quick add</p>
                <div className="flex gap-2">
                  {QUICK_ADDS.map((q) => (
                    <button
                      key={q.label}
                      onClick={() => handleQuickAdd(q.delta)}
                      className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl border border-white/8 bg-white/4 hover:bg-white/9 hover:border-white/14 transition-all text-sm text-white/60 hover:text-white"
                    >
                      <Plus className="w-3 h-3" />
                      {q.label.replace("+", "")}
                    </button>
                  ))}
                  <button
                    onClick={() => handleQuickAdd(-Math.floor(totalSeconds / 2))}
                    className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl border border-white/8 bg-white/4 hover:bg-white/9 hover:border-white/14 transition-all text-sm text-white/60 hover:text-white"
                  >
                    <Minus className="w-3 h-3" />
                    Half
                  </button>
                </div>
              </div>

              <div className="h-px bg-white/6 mx-6" />

              {/* Presets */}
              <div className="px-6 py-4 space-y-2.5">
                <p className="text-[10px] font-semibold text-white/30 uppercase tracking-widest">Presets</p>
                <div className="flex flex-wrap gap-2">
                  {PRESET_TEMPLATES.map((p) => {
                    const isSelected = totalSeconds === p.seconds;
                    return (
                      <button
                        key={p.label}
                        onClick={() => handlePreset(p.seconds)}
                        className={cn(
                          "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                          isSelected
                            ? "border text-white/90"
                            : "border border-white/8 bg-white/4 text-white/50 hover:text-white/75 hover:border-white/18"
                        )}
                        style={
                          isSelected
                            ? {
                                background: `${accent}22`,
                                borderColor: `${accent}55`,
                                color: "rgba(255,255,255,0.9)",
                              }
                            : undefined
                        }
                      >
                        {p.label}
                        <span className="ml-1.5 opacity-50">{formatDuration(p.seconds)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Recent */}
              {recentTimers.length > 0 && (
                <>
                  <div className="h-px bg-white/6 mx-6" />
                  <div className="px-6 py-4 space-y-2.5">
                    <p className="text-[10px] font-semibold text-white/30 uppercase tracking-widest">Recent</p>
                    <div className="flex flex-wrap gap-2">
                      {recentTimers.map((secs) => (
                        <button
                          key={secs}
                          onClick={() => handlePreset(secs)}
                          className="px-3 py-1.5 rounded-full text-xs border border-white/8 bg-white/4 text-white/50 hover:text-white/75 hover:border-white/18 transition-all"
                        >
                          {formatDuration(secs)}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Confirm */}
              <div className="px-6 pb-6 pt-2">
                <button
                  onClick={handleConfirm}
                  disabled={totalSeconds < 60}
                  className={cn(
                    "w-full py-3.5 rounded-2xl text-sm font-semibold tracking-wide transition-all flex items-center justify-center gap-2",
                    totalSeconds < 60 && "opacity-30 cursor-not-allowed"
                  )}
                  style={
                    totalSeconds >= 60
                      ? {
                          background: accent,
                          boxShadow: `0 0 24px ${accent}55`,
                          color: "white",
                        }
                      : { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.3)" }
                  }
                >
                  <Check className="w-4 h-4" />
                  Set {formatDuration(totalSeconds)}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
