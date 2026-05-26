import { motion } from "framer-motion";
import { X, History, BarChart2, Check, Minus } from "lucide-react";
import { format } from "date-fns";
import { useHistory } from "@/hooks/useHistory";
import { useSettings } from "@/hooks/useSettings";
import { calculateStats } from "@/lib/stats";
import { getT } from "@/lib/i18n";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface RightPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RightPanel({ isOpen, onClose }: RightPanelProps) {
  const { history } = useHistory();
  const { settings } = useSettings();
  const accent = settings.accentColor;
  const t = getT(settings.language);
  const stats = calculateStats(history);

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? 0 : "100%" }}
      transition={{ type: "spring", damping: 26, stiffness: 220 }}
      className="fixed inset-y-0 right-0 w-80 sm:w-96 z-50 flex flex-col border-l border-white/8"
      style={{
        background: "rgba(8,8,18,0.75)",
        backdropFilter: "blur(32px)",
        WebkitBackdropFilter: "blur(32px)",
      }}
    >
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
        <h2 className="text-base font-semibold text-white/90 tracking-wide">{t.activity}</h2>
        <button onClick={onClose} className="p-2 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-white/50 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>

      <ScrollArea className="flex-1">
        <div className="px-6 py-5 space-y-8">

          {/* Stats */}
          <section className="space-y-4">
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest flex items-center gap-2">
              <BarChart2 className="w-3.5 h-3.5" /> {t.statistics}
            </h3>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-white/4 p-4 rounded-2xl border border-white/6">
                <div className="text-2xl font-light text-white">{stats.totalSessionsCount}</div>
                <div className="text-[10px] text-white/40 uppercase tracking-widest mt-1">{t.sessions}</div>
              </div>
              <div className="bg-white/4 p-4 rounded-2xl border border-white/6">
                <div className="text-2xl font-light text-white">
                  {stats.streak} <span className="text-sm opacity-60">{t.days}</span>
                </div>
                <div className="text-[10px] text-white/40 uppercase tracking-widest mt-1">{t.streak}</div>
              </div>
              <div className="col-span-2 bg-white/4 p-4 rounded-2xl border border-white/6">
                <div className="text-2xl font-light text-white">
                  {Math.floor(stats.totalFocusMinutes / 60)}h {stats.totalFocusMinutes % 60}m
                </div>
                <div className="text-[10px] text-white/40 uppercase tracking-widest mt-1">{t.totalFocusTime}</div>
              </div>
            </div>

            {/* Chart */}
            <div className="h-36 w-full bg-white/4 rounded-2xl border border-white/6 p-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.last7Days}>
                  <XAxis
                    dataKey="name"
                    stroke="rgba(255,255,255,0.2)"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(255,255,255,0.04)" }}
                    contentStyle={{
                      backgroundColor: "rgba(10,10,24,0.95)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="minutes" fill={accent} radius={[4, 4, 0, 0]} opacity={0.85} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* History */}
          <section className="space-y-3">
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest flex items-center gap-2">
              <History className="w-3.5 h-3.5" /> {t.recentSessions}
            </h3>

            {history.length === 0 ? (
              <div className="text-center py-10 text-white/30 text-sm">{t.noSessions}</div>
            ) : (
              <div className="space-y-2">
                {history.map((session) => (
                  <div
                    key={session.id}
                    className="bg-white/4 px-4 py-3 rounded-2xl border border-white/6 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="text-sm text-white/85 font-medium truncate">
                        {session.taskName || "Focus Session"}
                      </div>
                      <div className="text-[11px] text-white/40 mt-0.5">
                        {format(new Date(session.completedAt), "MMM d, h:mm a")} · {Math.round(session.duration / 60)}m
                      </div>
                    </div>
                    <div className="shrink-0">
                      {session.status === "complete" ? (
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ background: `${accent}22`, border: `1px solid ${accent}44` }}
                        >
                          <Check className="w-3 h-3" style={{ color: accent }} />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                          <Minus className="w-3 h-3 text-white/40" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </ScrollArea>
    </motion.div>
  );
}
