import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Plus, Minus, Clock } from "lucide-react";
import { useHistory } from "@/hooks/useHistory";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const items = Array.from({ length: max + 1 }, (_, i) => i);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || isScrolling.current) return;
    el.scrollTop = (PADDING + value) * ITEM_H;
  }, [value]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTop = (PADDING + value) * ITEM_H;
  }, []);

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
      <span className="text-xs font-medium text-white/40 uppercase tracking-widest">{label}</span>
      <div className="relative" style={{ height: VISIBLE * ITEM_H, width: 90 }}>
        {/* Top fade */}
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/60 to-transparent z-10 pointer-events-none rounded-t-xl" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none rounded-b-xl" />
        {/* Selection band */}
        <div
          className="absolute inset-x-0 z-20 pointer-events-none border-y border-white/15 bg-white/6 rounded-lg"
          style={{ top: PADDING * ITEM_H, height: ITEM_H }}
        />
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="overflow-y-scroll h-full"
          style={{
            scrollSnapType: "y mandatory",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <style>{`div::-webkit-scrollbar { display: none; }`}</style>
          {Array(PADDING).fill(null).map((_, i) => (
            <div key={`pt${i}`} style={{ height: ITEM_H, scrollSnapAlign: "center" }} />
          ))}
          {items.map((item) => (
            <div
              key={item}
              onClick={() => {
                onChange(item);
                const el = containerRef.current;
                if (el) el.scrollTo({ top: (PADDING + item) * ITEM_H, behavior: "smooth" });
              }}
              style={{ height: ITEM_H, scrollSnapAlign: "center" }}
              className={cn(
                "flex items-center justify-center cursor-pointer transition-all duration-150 select-none",
                item === value
                  ? "text-white text-4xl font-thin tabular-nums"
                  : "text-white/25 text-2xl font-thin tabular-nums hover:text-white/50"
              )}
            >
              {item.toString().padStart(2, "0")}
            </div>
          ))}
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

  const initHours = Math.floor(currentDuration / 3600);
  const initMinutes = Math.floor((currentDuration % 3600) / 60);

  const [hours, setHours] = useState(initHours);
  const [minutes, setMinutes] = useState(initMinutes === 0 && initHours === 0 ? 25 : initMinutes);

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

  const recentTimers = Array.from(
    new Map(
      history
        .filter((s) => s.duration >= 60)
        .map((s) => {
          const mins = Math.round(s.duration / 60);
          return [mins, mins];
        })
    ).values()
  ).slice(0, 4);

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
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="fixed z-50 inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 top-1/2 -translate-y-1/2 w-full sm:w-[460px]"
          >
            <div
              className="rounded-3xl border border-white/10 overflow-hidden"
              style={{
                background: "rgba(10, 10, 20, 0.88)",
                backdropFilter: "blur(40px)",
                WebkitBackdropFilter: "blur(40px)",
                boxShadow: "0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-5 pb-2">
                <div className="flex items-center gap-2 text-white/60">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium tracking-wide">Set Duration</span>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-white/50"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scroll Wheels */}
              <div className="flex items-center justify-center gap-4 px-6 py-2">
                <WheelPicker value={hours} max={23} onChange={setHours} label="Hours" />
                <div className="text-4xl font-thin text-white/40 pb-4">:</div>
                <WheelPicker value={minutes} max={59} onChange={setMinutes} label="Minutes" />
              </div>

              {/* Total label */}
              <div className="text-center pb-3">
                <span className="text-xs text-white/30">
                  {totalSeconds >= 3600
                    ? `${hours}h ${minutes}m`
                    : `${minutes} minute${minutes !== 1 ? "s" : ""}`}
                </span>
              </div>

              {/* Divider */}
              <div className="h-px bg-white/6 mx-6" />

              {/* Quick Add */}
              <div className="px-6 py-4 space-y-3">
                <p className="text-xs font-medium text-white/35 uppercase tracking-widest">Quick add</p>
                <div className="flex gap-2">
                  {QUICK_ADDS.map((q) => (
                    <button
                      key={q.label}
                      onClick={() => handleQuickAdd(q.delta)}
                      className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl border border-white/8 bg-white/5 hover:bg-white/10 hover:border-white/15 transition-all text-sm text-white/70 hover:text-white"
                    >
                      <Plus className="w-3 h-3" />
                      {q.label.replace("+", "")}
                    </button>
                  ))}
                  <button
                    onClick={() => handleQuickAdd(-Math.floor(totalSeconds / 2))}
                    className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl border border-white/8 bg-white/5 hover:bg-white/10 hover:border-white/15 transition-all text-sm text-white/70 hover:text-white"
                  >
                    <Minus className="w-3 h-3" />
                    Half
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-white/6 mx-6" />

              {/* Presets */}
              <div className="px-6 py-4 space-y-3">
                <p className="text-xs font-medium text-white/35 uppercase tracking-widest">Presets</p>
                <div className="flex flex-wrap gap-2">
                  {PRESET_TEMPLATES.map((p) => {
                    const isSelected = totalSeconds === p.seconds;
                    return (
                      <button
                        key={p.label}
                        onClick={() => handlePreset(p.seconds)}
                        className={cn(
                          "px-3.5 py-1.5 rounded-full text-xs font-medium transition-all",
                          isSelected
                            ? "bg-violet-500/30 border border-violet-400/40 text-violet-200"
                            : "border border-white/8 bg-white/5 text-white/55 hover:text-white hover:border-white/20 hover:bg-white/10"
                        )}
                      >
                        {p.label}
                        <span className="ml-1.5 text-white/40">
                          {Math.floor(p.seconds / 3600) > 0
                            ? `${Math.floor(p.seconds / 3600)}h ${Math.floor((p.seconds % 3600) / 60)}m`
                            : `${Math.floor(p.seconds / 60)}m`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Recent */}
              {recentTimers.length > 0 && (
                <>
                  <div className="h-px bg-white/6 mx-6" />
                  <div className="px-6 py-4 space-y-3">
                    <p className="text-xs font-medium text-white/35 uppercase tracking-widest">Recent</p>
                    <div className="flex flex-wrap gap-2">
                      {recentTimers.map((mins) => (
                        <button
                          key={mins}
                          onClick={() => handlePreset(mins * 60)}
                          className="px-3.5 py-1.5 rounded-full text-xs border border-white/8 bg-white/5 text-white/55 hover:text-white hover:border-white/20 hover:bg-white/10 transition-all"
                        >
                          {mins >= 60 ? `${Math.floor(mins / 60)}h ${mins % 60 > 0 ? `${mins % 60}m` : ""}` : `${mins}m`}
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
                    totalSeconds >= 60
                      ? "bg-violet-600 hover:bg-violet-500 text-white shadow-[0_0_24px_rgba(139,92,246,0.35)] hover:shadow-[0_0_36px_rgba(139,92,246,0.5)]"
                      : "bg-white/5 text-white/30 cursor-not-allowed"
                  )}
                >
                  <Check className="w-4 h-4" />
                  Set {totalSeconds >= 3600
                    ? `${hours}h ${minutes > 0 ? `${minutes}m` : ""}`
                    : `${minutes}m`}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
