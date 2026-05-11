import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TimerDisplay } from "@/components/timer/TimerDisplay";
import { TimerControls } from "@/components/timer/TimerControls";
import { SessionPresets } from "@/components/timer/SessionPresets";
import { TaskInput } from "@/components/timer/TaskInput";
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

  const timer = useTimer(settings.defaultDuration);
  const stats = calculateStats(history);

  // Background resolution
  const bgImage = backgrounds.find(b => b.id === settings.selectedBackground)?.url || backgrounds[0].url;

  // Handle timer completion
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
  }, [timer.timeLeft, timer.duration, timer.isActive]);

  const handlePause = () => {
    timer.pause();
    // Intentionally interrupting a session? We could record it, but usually pause is temporary.
    // For now, only record on complete or explicit reset while active.
  };

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

  const formatTotalTime = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h > 0) return `${h}h ${m}m focused`;
    return `${m}m focused`;
  };

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden bg-black text-white font-sans">
      {/* Background Image with crossfade */}
      <AnimatePresence>
        <motion.div
          key={bgImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={bgImage} 
            alt="background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </motion.div>
      </AnimatePresence>

      {/* Top Right Stats */}
      <div className="absolute top-6 right-8 z-20 text-sm font-medium text-white/60 tracking-wider uppercase drop-shadow-md">
        {formatTotalTime(stats.totalFocusMinutes)}
      </div>

      {/* Main Stage */}
      <main className="relative z-10 w-full h-full min-h-[100dvh] flex flex-col items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center w-full max-w-2xl"
        >
          <SessionPresets 
            activeDuration={timer.duration}
            onSelectPreset={handlePresetSelect} 
          />
          
          <div className="mt-12 mb-8">
            <TimerDisplay 
              timeLeft={timer.timeLeft}
              duration={timer.duration}
              isActive={timer.isActive}
              animationStyle={settings.animationStyle}
            />
          </div>

          <TaskInput value={taskName} onChange={setTaskName} />

          <TimerControls 
            isActive={timer.isActive}
            timeLeft={timer.timeLeft}
            duration={timer.duration}
            onStart={timer.start}
            onPause={handlePause}
            onReset={handleReset}
          />
        </motion.div>

        {/* Motivational Quote */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-28 text-white/40 text-sm font-light italic text-center max-w-md"
        >
          "Focus is a matter of deciding what things you're not going to do."
        </motion.div>
      </main>

      {/* Panels */}
      <LeftPanel isOpen={isLeftOpen} onClose={() => setIsLeftOpen(false)} />
      <RightPanel isOpen={isRightOpen} onClose={() => setIsRightOpen(false)} />
      
      <BottomDock 
        isLeftOpen={isLeftOpen}
        isRightOpen={isRightOpen}
        onToggleLeft={() => {
          setIsLeftOpen(!isLeftOpen);
          if (!isLeftOpen) setIsRightOpen(false);
        }}
        onToggleRight={() => {
          setIsRightOpen(!isRightOpen);
          if (!isRightOpen) setIsLeftOpen(false);
        }}
        onToggleMinimal={() => setIsMinimalMode(true)}
      />

      <MinimalMode 
        isActive={isMinimalMode} 
        onExit={() => setIsMinimalMode(false)}
        timeLeft={timer.timeLeft}
        isTimerActive={timer.isActive}
        onToggleTimer={() => timer.isActive ? handlePause() : timer.start()}
      />
    </div>
  );
}
