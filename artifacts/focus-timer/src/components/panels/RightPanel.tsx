import React from "react";
import { motion } from "framer-motion";
import { X, History, BarChart2, Check, Minus } from "lucide-react";
import { format } from "date-fns";
import { useHistory } from "@/hooks/useHistory";
import { calculateStats } from "@/lib/stats";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface RightPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RightPanel({ isOpen, onClose }: RightPanelProps) {
  const { history } = useHistory();
  const stats = calculateStats(history);

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? 0 : "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed inset-y-0 right-0 w-80 sm:w-96 glass-panel z-50 flex flex-col"
    >
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <h2 className="text-xl font-medium text-white/90">Activity</h2>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition-colors">
          <X className="w-5 h-5 text-white/70" />
        </button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6 space-y-8">
          {/* Stats */}
          <section className="space-y-4">
            <h3 className="text-sm font-medium text-white/70 uppercase tracking-wider flex items-center gap-2">
              <BarChart2 className="w-4 h-4" /> Statistics
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                <div className="text-2xl font-light text-white">{stats.totalSessionsCount}</div>
                <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Sessions</div>
              </div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                <div className="text-2xl font-light text-white">{stats.streak} <span className="text-sm">days</span></div>
                <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Streak</div>
              </div>
              <div className="col-span-2 bg-white/5 p-4 rounded-xl border border-white/5">
                <div className="text-2xl font-light text-white">{Math.floor(stats.totalFocusMinutes / 60)}h {stats.totalFocusMinutes % 60}m</div>
                <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Total Focus Time</div>
              </div>
            </div>

            <div className="h-40 w-full mt-6 bg-white/5 rounded-xl border border-white/5 p-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.last7Days}>
                  <XAxis 
                    dataKey="name" 
                    stroke="rgba(255,255,255,0.3)" 
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  />
                  <Bar dataKey="minutes" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* History */}
          <section className="space-y-4">
            <h3 className="text-sm font-medium text-white/70 uppercase tracking-wider flex items-center gap-2">
              <History className="w-4 h-4" /> Recent Sessions
            </h3>
            
            {history.length === 0 ? (
              <div className="text-center py-8 text-white/40 text-sm">
                No sessions yet — start focusing!
              </div>
            ) : (
              <div className="space-y-3">
                {history.map((session) => (
                  <div key={session.id} className="bg-white/5 p-3 rounded-lg border border-white/5 flex items-center justify-between">
                    <div>
                      <div className="text-sm text-white/90 font-medium">
                        {session.taskName || "Focus Session"}
                      </div>
                      <div className="text-xs text-white/50 mt-0.5">
                        {format(new Date(session.completedAt), "MMM d, h:mm a")} • {Math.round(session.duration / 60)}m
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      {session.status === "complete" ? (
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 text-primary">
                          <Check className="w-3 h-3" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-white/40">
                          <Minus className="w-3 h-3" />
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
