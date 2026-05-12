import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Plus, Minus, Clock } from "lucide-react";
import { useHistory } from "@/hooks/useHistory";
import { useSettings } from "@/hooks/useSettings";
import { getT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface TimePickerPanelProps {
  isOpen: boolean;
  currentDuration: number;
  taskName: string;
  onTaskNameChange: (name: string) => void;
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

function formatDuration(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  if (h > 0 && m > 0) return `${h}h ${m}m`;
  if (h > 0) return `${h}h`;
  return `${m}m`;
}

function WheelPicker({
  value, max, onChange, label, accent,
}: {
  value: number; max: number; onChange: (v: number) => void; label: string; accent: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  // displayValue tracks what's VISUALLY centered right now (updates on every scroll frame)
  const [displayValue, setDisplayValue] = useState(value);
  const snapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const programmaticRef = useRef(false);

  // On mount: jump instantly to the correct position
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTop = (PADDING + value) * ITEM_H;
    setDisplayValue(value);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When parent changes value (preset click, etc.) scroll smoothly
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const target = (PADDING + value) * ITEM_H;
    if (Math.abs(el.scrollTop - target) < 2) return; // already there
    programmaticRef.current = true;
    el.scrollTo({ top: target, behavior: "smooth" });
    setDisplayValue(value);
    setTimeout(() => { programmaticRef.current = false; }, 400);
  }, [value]);

  // On every scroll frame: read which item is centered → update displayValue immediately
  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const raw = el.scrollTop / ITEM_H - PADDING;
    const nearest = Math.max(0, Math.min(max, Math.round(raw)));
    setDisplayValue(nearest);

    // Debounce: after user stops, snap perfectly and commit to parent
    if (snapTimerRef.current) clearTimeout(snapTimerRef.current);
    snapTimerRef.current = setTimeout(() => {
      const finalRaw = Math.round(el.scrollTop / ITEM_H) - PADDING;
      const finalVal = Math.max(0, Math.min(max, finalRaw));
      onChange(finalVal);
      setDisplayValue(finalVal);
      // Snap to exact pixel grid
      el.scrollTo({ top: (PADDING + finalVal) * ITEM_H, behavior: "smooth" });
    }, 120);
  }, [max, onChange]);

  // Mouse-wheel: step exactly 1 item per wheel tick (prevents the 2-item jump)
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const el = containerRef.current;
    if (!el) return;

    const dir = e.deltaY > 0 ? 1 : -1;
    const currentCenter = Math.round(el.scrollTop / ITEM_H) - PADDING;
    const nextVal = Math.max(0, Math.min(max, currentCenter + dir));
    el.scrollTo({ top: (PADDING + nextVal) * ITEM_H, behavior: "smooth" });
  }, [max]);

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-[10px] font-semibold text-white/30 uppercase tracking-widest">{label}</span>
      <div className="relative" style={{ height: VISIBLE * ITEM_H, width: 88 }}>
        {/* Strong top fade — must fully hide non-selected items */}
        <div
          className="absolute top-0 inset-x-0 z-10 pointer-events-none"
          style={{
            height: PADDING * ITEM_H,
            background: "linear-gradient(to bottom, rgba(12,6,34,0.97) 40%, transparent 100%)",
          }}
        />
        {/* Strong bottom fade */}
        <div
          className="absolute bottom-0 inset-x-0 z-10 pointer-events-none"
          style={{
            height: PADDING * ITEM_H,
            background: "linear-gradient(to top, rgba(12,6,34,0.97) 40%, transparent 100%)",
          }}
        />
        {/* Selection highlight (stays fixed in the center slot) */}
        <div
          className="absolute inset-x-2 z-20 pointer-events-none rounded-xl"
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
          onWheel={handleWheel}
          className="overflow-y-scroll h-full"
          style={{ scrollSnapType: "y mandatory", scrollbarWidth: "none" }}
        >
          {Array(PADDING).fill(null).map((_, i) => (
            <div key={`pt${i}`} style={{ height: ITEM_H, scrollSnapAlign: "center" }} />
          ))}
          {Array.from({ length: max + 1 }, (_, i) => i).map((item) => {
            // Use displayValue (real-time scroll position) — not value prop
            const isSel = item === displayValue;
            return (
              <div
                key={item}
                onClick={() => {
                  onChange(item);
                  containerRef.current?.scrollTo({ top: (PADDING + item) * ITEM_H, behavior: "smooth" });
                  setDisplayValue(item);
                }}
                style={{ height: ITEM_H, scrollSnapAlign: "center" }}
                className={cn(
                  "flex items-center justify-center cursor-pointer select-none tabular-nums font-mono transition-none",
                  isSel
                    ? "text-white text-4xl font-thin"
                    : "text-white/18 text-2xl font-thin"
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

export function TimePickerPanel({ isOpen, currentDuration, taskName, onTaskNameChange, onConfirm, onClose }: TimePickerPanelProps) {
  const { history } = useHistory();
  const { settings } = useSettings();
  const accent = settings.accentColor;
  const t = getT(settings.language);

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

  const recentTimers = Array.from(
    new Map(
      history
        .filter((s) => s.duration >= 60)
        .map((s) => { const secs = Math.round(s.duration / 60) * 60; return [secs, secs]; })
    ).values()
  ).slice(0, 5);

  const QUICK_ADDS = [
    { label: "+5m",  delta: 5 * 60 },
    { label: "+15m", delta: 15 * 60 },
    { label: "+30m", delta: 30 * 60 },
  ];

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
            style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(6px)" }}
          />
          <motion.div
            key="tp-panel"
            initial={{ opacity: 0, scale: 0.93, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 24 }}
            transition={{ type: "spring", damping: 30, stiffness: 340 }}
            className="fixed z-50 inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 top-1/2 -translate-y-1/2 w-full sm:w-[420px]"
          >
            {/* Main glass card */}
            <div
              className="rounded-3xl overflow-hidden"
              style={{
                background: "linear-gradient(145deg, rgba(20,12,50,0.80) 0%, rgba(8,8,28,0.76) 100%)",
                backdropFilter: "blur(56px)",
                WebkitBackdropFilter: "blur(56px)",
                border: "1px solid rgba(255,255,255,0.10)",
                boxShadow: `0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset, 0 0 80px ${accent}18`,
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 pt-5 pb-4">
                <div className="flex items-center gap-2" style={{ color: `${accent}aa` }}>
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-semibold tracking-wide">{t.setDuration}</span>
                </div>
                <button onClick={onClose} className="p-1.5 rounded-full hover:bg-white/8 transition-colors text-white/35 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Task name — glass pill */}
              <div className="px-5 pb-5">
                <div
                  className="flex items-center px-4 py-3.5 rounded-2xl transition-all"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.10)",
                  }}
                >
                  <input
                    type="text"
                    value={taskName}
                    onChange={(e) => onTaskNameChange(e.target.value)}
                    placeholder={t.taskPlaceholder}
                    maxLength={80}
                    className="flex-1 bg-transparent text-white/80 placeholder-white/25 text-sm outline-none"
                    style={{ caretColor: accent }}
                  />
                </div>
              </div>

              {/* Wheels */}
              <div
                className="mx-5 mb-4 rounded-2xl overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div className="flex items-center justify-center gap-4 px-4 py-3">
                  <WheelPicker value={hours} max={23} onChange={setHours} label={t.hours} accent={accent} />
                  <div className="text-4xl font-thin text-white/20 pb-4 select-none">:</div>
                  <WheelPicker value={minutes} max={59} onChange={setMinutes} label={t.minutes} accent={accent} />
                </div>
                {/* Total */}
                <div className="text-center pb-3">
                  <span className="text-xs font-semibold" style={{ color: `${accent}cc` }}>
                    {formatDuration(totalSeconds)}
                  </span>
                </div>
              </div>

              {/* Quick adds */}
              <div className="px-5 pb-4 space-y-2">
                <p className="text-[10px] font-semibold text-white/28 uppercase tracking-widest">{t.quickAdd}</p>
                <div className="flex gap-2">
                  {QUICK_ADDS.map((q) => (
                    <button
                      key={q.label}
                      onClick={() => handleQuickAdd(q.delta)}
                      className="flex-1 flex items-center justify-center gap-1 py-2.5 rounded-xl text-sm text-white/55 hover:text-white transition-all"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      <Plus className="w-3 h-3" />{q.label.replace("+", "")}
                    </button>
                  ))}
                  <button
                    onClick={() => handleQuickAdd(-Math.floor(totalSeconds / 2))}
                    className="flex-1 flex items-center justify-center gap-1 py-2.5 rounded-xl text-sm text-white/55 hover:text-white transition-all"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <Minus className="w-3 h-3" />Half
                  </button>
                </div>
              </div>

              {/* Presets */}
              <div className="px-5 pb-4 space-y-2">
                <p className="text-[10px] font-semibold text-white/28 uppercase tracking-widest">{t.presets}</p>
                <div className="flex flex-wrap gap-2">
                  {PRESET_TEMPLATES.map((p) => {
                    const isSel = totalSeconds === p.seconds;
                    return (
                      <button
                        key={p.label}
                        onClick={() => handlePreset(p.seconds)}
                        className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                        style={
                          isSel
                            ? { background: `${accent}22`, border: `1px solid ${accent}55`, color: "rgba(255,255,255,0.9)" }
                            : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.45)" }
                        }
                      >
                        {p.label} <span className="opacity-50 ml-1">{formatDuration(p.seconds)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Recent */}
              {recentTimers.length > 0 && (
                <div className="px-5 pb-4 space-y-2">
                  <p className="text-[10px] font-semibold text-white/28 uppercase tracking-widest">{t.recent}</p>
                  <div className="flex flex-wrap gap-2">
                    {recentTimers.map((secs) => (
                      <button
                        key={secs}
                        onClick={() => handlePreset(secs)}
                        className="px-3 py-1.5 rounded-full text-xs text-white/45 hover:text-white/75 transition-all"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                      >
                        {formatDuration(secs)}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Confirm */}
              <div className="px-5 pb-5 pt-1">
                <button
                  onClick={() => { if (totalSeconds >= 60) { onConfirm(totalSeconds); onClose(); } }}
                  disabled={totalSeconds < 60}
                  className={cn("w-full py-4 rounded-2xl text-sm font-semibold tracking-wide transition-all flex items-center justify-center gap-2", totalSeconds < 60 && "opacity-30 cursor-not-allowed")}
                  style={totalSeconds >= 60
                    ? { background: accent, boxShadow: `0 0 28px ${accent}55`, color: "white" }
                    : { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.3)" }}
                >
                  <Check className="w-4 h-4" />
                  {t.confirm} {formatDuration(totalSeconds)}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
