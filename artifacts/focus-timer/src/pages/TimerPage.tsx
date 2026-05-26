import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { SEOHead } from "@/components/seo/SEOHead";
import { SEOSection } from "@/components/seo/SEOSection";
import { SEOFooter } from "@/components/seo/SEOFooter";
import { seoConfig } from "@/config/seo";
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
import { useImagePreloader } from "@/hooks/useImagePreloader";
import { calculateStats } from "@/lib/stats";
import { backgrounds } from "@/lib/backgrounds";
import { getFontCss } from "@/lib/fonts";

// Memoized background component for better performance
const BackgroundImage = memo(({ bgImage, dimOpacity }: { bgImage: string; dimOpacity: number }) => (
  <AnimatePresence mode="sync">
    <motion.div
      key={bgImage}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-0"
    >
      <img 
        src={bgImage} 
        alt="background" 
        className="w-full h-full object-cover"
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{ background: `rgba(0,0,0,${dimOpacity})` }}
      />
    </motion.div>
  </AnimatePresence>
));

BackgroundImage.displayName = 'BackgroundImage';

export default function TimerPage() {
  const { settings, setSettings } = useSettings();
  const { addSession, history } = useHistory();
  const location = useLocation();

  // Find SEO config based on current path
  const currentPath = location.pathname.replace(/\/$/, '') || "/";
  const currentSeoConfig = Object.values(seoConfig).find(
    (config) => config.path === currentPath
  ) || seoConfig.home;

  const [taskName, setTaskName] = useState("");
  const [isLeftOpen, setIsLeftOpen] = useState(false);
  const [isRightOpen, setIsRightOpen] = useState(false);
  const [isMinimalMode, setIsMinimalMode] = useState(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);

  const timer = useTimer(settings.defaultDuration);
  const stats = useMemo(() => calculateStats(history), [history]);

  // Preload all background images for instant switching
  const backgroundUrls = useMemo(() => backgrounds.map(bg => bg.url), []);
  useImagePreloader(backgroundUrls);

  // Resolve background URL — handles "custom" id
  const bgImage = useMemo(() =>
    settings.selectedBackground === "custom"
      ? settings.customBackgroundUrl || backgrounds[0].url
      : backgrounds.find((b) => b.id === settings.selectedBackground)?.url ?? backgrounds[0].url,
    [settings.selectedBackground, settings.customBackgroundUrl]
  );

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

  const handlePause = useCallback(() => timer.pause(), [timer]);

  const handleReset = useCallback(() => {
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
  }, [timer, taskName, addSession, settings.animationStyle, settings.selectedBackground]);

  const handlePresetSelect = useCallback((durationSeconds: number) => {
    setSettings({ defaultDuration: durationSeconds });
    timer.reset(durationSeconds);
  }, [timer, setSettings]);

  const handleAdjust = useCallback(
    (deltaSecs: number) => {
      if (timer.isActive) return;
      const newDur = Math.max(60, timer.duration + deltaSecs);
      setSettings({ defaultDuration: newDur });
      timer.reset(newDur);
    },
    [timer, setSettings]
  );

  const handleTimePickerConfirm = useCallback((seconds: number) => {
    setSettings({ defaultDuration: seconds });
    timer.reset(seconds);
  }, [timer, setSettings]);

  const formatTotalTime = useCallback((minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h > 0 && m > 0) return `${h}h ${m}m`;
    if (h > 0) return `${h}h`;
    return `${m}m`;
  }, []);

  const fontFamily = useMemo(() => getFontCss(settings.fontFamily), [settings.fontFamily]);

  // Set the timer duration when visiting a specific cluster page for the first time
  useEffect(() => {
    if (currentSeoConfig.preset && timer.duration === 25 * 60 && !timer.isActive && timer.timeLeft === timer.duration) {
      if (currentSeoConfig.preset !== settings.defaultDuration && currentSeoConfig.preset !== 25 * 60) {
        setSettings({ defaultDuration: currentSeoConfig.preset });
        timer.reset(currentSeoConfig.preset);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSeoConfig.preset]);

  return (
    <div
      className="relative min-h-[100dvh] w-full bg-black text-white overflow-y-auto overflow-x-hidden"
      style={{ fontFamily }}
    >
      <SEOHead 
        title={currentSeoConfig.title}
        description={currentSeoConfig.description}
        keywords={currentSeoConfig.keywords}
        canonicalUrl={currentSeoConfig.path === "/" ? "/" : `${currentSeoConfig.path}/`}
        h1={currentSeoConfig.h1}
      />

      <BackgroundImage bgImage={bgImage} dimOpacity={dimOpacity} />

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

      {/* SEO Content Section and Footer (scrollable) */}
      <SEOSection currentPath={currentSeoConfig.path} />
      <SEOFooter />

      <LeftPanel isOpen={isLeftOpen} onClose={() => setIsLeftOpen(false)} />
      <RightPanel isOpen={isRightOpen} onClose={() => setIsRightOpen(false)} />

      <BottomDock
        isLeftOpen={isLeftOpen}
        isRightOpen={isRightOpen}
        onToggleLeft={() => { setIsLeftOpen((v) => !v); setIsRightOpen(false); }}
        onToggleRight={() => { setIsRightOpen((v) => !v); setIsLeftOpen(false); }}
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
