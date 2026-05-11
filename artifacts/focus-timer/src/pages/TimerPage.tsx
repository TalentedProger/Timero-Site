import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TimerDisplay } from "@/components/timer/TimerDisplay";
import { TimerControls } from "@/components/timer/TimerControls";
import { SessionPresets } from "@/components/timer/SessionPresets";
import { TimePickerPanel } from "@/components/timer/TimePickerPanel";
import { LeftPanel } from "@/components/panels/LeftPanel";
import { RightPanel } from "@/components/panels/RightPanel";
import { BottomDock } from "@/components/panels/BottomDock";
import { MinimalMode } from "@/components/panels/MinimalMode";
import { useSettings } from "@/hooks/useSettings";
import { useTimer } from "@/hooks/useTimer";
import { useHistory } from "@/hooks/useHistory";
import { calculateStats } from "@/lib/stats";
import { backgrounds } from "@/lib/backgrounds";

export default function TimerPage() {
  const { settings, setSettings } = useSettings();
  const { addSession, history } = useHistory();

  const [taskName, setTaskName] = useState("");
  const [isLeftOpen, setIsLeftOpen] = useState(false);
  const [isRightOpen, setIsRightOpen] = useState(false);
  const [isMinimalMode, setIsMinimalMode] = useState(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);

  const timer = useTimer(settings.defaultDuration);
  const stats = calculateStats(history);

  const bgImage =
    backgrounds.find((b) => b.id === settings.selectedBackground)?.url ??
    backgrounds[0].url;

  const dimOpacity = settings.backgroundDim / 100;

  useEffect(() => {
    if (timer.timeLeft === 0 && timer.duration > 0 && !timer.isActive) {
      addSession({
        taskName: taskName || "Focus Session",
        duration: timer.duration,
        status: "complete",
        animationStyle: settings.animationStyle,
        backgroundId: settings.selectedBackground,
      });
      if (settings.autoRepeat) {
        timer.reset();
        timer.start();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer.timeLeft, timer.duration, timer.isActive]);

  const handlePause = () => timer.pause();

  const handleReset = () => {
    if (timer.isActive) {
      addSession({
        taskName: taskName || "Focus Session",
        duration: timer.duration - timer.timeLeft,
        status: "interrupted",
        animationStyle: settings.animationStyle,
        backgroundId: settings.selectedBackground,
      });
    }
    timer.reset();
  };

  const handlePresetSelect = (durationSeconds: number) => {
    setSettings({ defaultDuration: durationSeconds });
    timer.reset(durationSeconds);
  };

  const handleAdjust = useCallback(
    (deltaSecs: number) => {
      if (timer.isActive) return;
      const newDur = Math.max(60, timer.duration + deltaSecs);
      setSettings({ defaultDuration: newDur });
      timer.reset(newDur);
    },
    [timer, setSettings]
  );

  const handleTimePickerConfirm = (seconds: number) => {
    setSettings({ defaultDuration: seconds });
    timer.reset(seconds);
  };

  const formatTotalTime = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h > 0 && m > 0) return `${h}h ${m}m`;
    if (h > 0) return `${h}h`;
    return `${m}m`;
  };

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden bg-black text-white font-sans">
      {/* Background crossfade */}
      <AnimatePresence mode="sync">
        <motion.div
          key={bgImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 z-0"
        >
          <img src={bgImage} alt="background" className="w-full h-full object-cover" />
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{ background: `rgba(0,0,0,${dimOpacity})` }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Top-right — total focused today */}
      {stats.totalFocusMinutes > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute top-6 right-8 z-20 text-xs font-medium text-white/40 tracking-widest uppercase"
        >
          {formatTotalTime(stats.totalFocusMinutes)}
        </motion.div>
      )}

      {/* Main stage */}
      <main className="relative z-10 w-full min-h-[100dvh] flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-col items-center w-full max-w-3xl gap-6"
        >
          <SessionPresets
            activeDuration={timer.duration}
            onSelectPreset={handlePresetSelect}
          />

          <TimerDisplay
            timeLeft={timer.timeLeft}
            duration={timer.duration}
            isActive={timer.isActive}
            animationStyle={settings.animationStyle}
            onEditClick={() => setIsTimePickerOpen(true)}
            onAdjust={handleAdjust}
          />

          <TimerControls
            isActive={timer.isActive}
            timeLeft={timer.timeLeft}
            duration={timer.duration}
            onStart={timer.start}
            onPause={handlePause}
            onReset={handleReset}
            onSetDuration={() => setIsTimePickerOpen(true)}
          />
        </motion.div>
      </main>

      <LeftPanel isOpen={isLeftOpen} onClose={() => setIsLeftOpen(false)} />
      <RightPanel isOpen={isRightOpen} onClose={() => setIsRightOpen(false)} />

      <BottomDock
        isLeftOpen={isLeftOpen}
        isRightOpen={isRightOpen}
        onToggleLeft={() => {
          setIsLeftOpen((v) => !v);
          setIsRightOpen(false);
        }}
        onToggleRight={() => {
          setIsRightOpen((v) => !v);
          setIsLeftOpen(false);
        }}
        onToggleMinimal={() => setIsMinimalMode(true)}
      />

      <MinimalMode
        isActive={isMinimalMode}
        onExit={() => setIsMinimalMode(false)}
        timeLeft={timer.timeLeft}
        isTimerActive={timer.isActive}
        onToggleTimer={() => (timer.isActive ? handlePause() : timer.start())}
      />

      <TimePickerPanel
        isOpen={isTimePickerOpen}
        currentDuration={timer.duration}
        taskName={taskName}
        onTaskNameChange={setTaskName}
        onConfirm={handleTimePickerConfirm}
        onClose={() => setIsTimePickerOpen(false)}
      />
    </div>
  );
}
