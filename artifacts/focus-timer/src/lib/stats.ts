import { Session } from "@/hooks/useHistory";
import { format, subDays, isSameDay } from "date-fns";

export function calculateStats(sessions: Session[]) {
  const completeSessions = sessions.filter((s) => s.status === "complete");

  const totalSessionsCount = completeSessions.length;
  
  const totalFocusSeconds = completeSessions.reduce((acc, curr) => acc + curr.duration, 0);
  const totalFocusMinutes = Math.floor(totalFocusSeconds / 60);

  // Calculate Streak
  let streak = 0;
  const today = new Date();
  
  // Group complete sessions by day string (YYYY-MM-DD)
  const sessionDays = new Set(
    completeSessions.map(s => {
      const d = new Date(s.completedAt);
      return format(d, 'yyyy-MM-dd');
    })
  );

  let checkDate = today;
  // Check if today has a session. If not, streak might be broken or just not started today yet.
  // Actually, standard streak: if you didn't do it today, but did it yesterday, streak is still active but not incremented for today.
  // Let's count consecutive days backwards from yesterday if today doesn't have one, or today if it does.
  const todayStr = format(today, 'yyyy-MM-dd');
  const yesterdayStr = format(subDays(today, 1), 'yyyy-MM-dd');

  if (sessionDays.has(todayStr)) {
    streak = 1;
    let daysBack = 1;
    while (sessionDays.has(format(subDays(today, daysBack), 'yyyy-MM-dd'))) {
      streak++;
      daysBack++;
    }
  } else if (sessionDays.has(yesterdayStr)) {
    let daysBack = 1;
    while (sessionDays.has(format(subDays(today, daysBack), 'yyyy-MM-dd'))) {
      streak++;
      daysBack++;
    }
  }

  // Last 7 days data for chart
  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = subDays(today, 6 - i);
    return {
      date: d,
      name: format(d, 'EEE'), // Mon, Tue, etc.
      minutes: 0,
      fullDateStr: format(d, 'yyyy-MM-dd')
    };
  });

  completeSessions.forEach(s => {
    const sDateStr = format(new Date(s.completedAt), 'yyyy-MM-dd');
    const dayData = last7Days.find(d => d.fullDateStr === sDateStr);
    if (dayData) {
      dayData.minutes += Math.floor(s.duration / 60);
    }
  });

  return {
    totalSessionsCount,
    totalFocusMinutes,
    streak,
    last7Days
  };
}
