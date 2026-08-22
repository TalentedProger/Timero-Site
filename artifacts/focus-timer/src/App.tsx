import { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { HistoryProvider } from "@/contexts/HistoryContext";
import { useSettings } from "@/hooks/useSettings";
import { getFontCss } from "@/lib/fonts";
import { initAudio } from "@/lib/sounds";
import { backgrounds } from "@/lib/backgrounds";

// Lazy load pages for better performance
const TimerPage = lazy(() => import("@/pages/TimerPage"));
const NotFound = lazy(() => import("@/pages/not-found"));

function FontInjector() {
  const { settings } = useSettings();
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--app-font",
      getFontCss(settings.fontFamily)
    );
    document.body.style.fontFamily = getFontCss(settings.fontFamily);
  }, [settings.fontFamily]);
  return null;
}

// Компонент для предзагрузки фоновых изображений
function BackgroundPreloader() {
  useEffect(() => {
    // Используем requestIdleCallback для предзагрузки после того как сайт загрузился
    const preloadBackgrounds = () => {
      const imageUrls = backgrounds.map(bg => bg.url);
      
      imageUrls.forEach((url, index) => {
        // Задержка между загрузкой каждого изображения для лучшей производительности
        setTimeout(() => {
          const img = new Image();
          img.src = url;
          // Опционально: можно добавить обработчики onload/onerror для отслеживания
        }, index * 100); // 100ms задержка между каждым изображением
      });
    };

    // Используем requestIdleCallback если доступен, иначе setTimeout
    if ('requestIdleCallback' in window) {
      const idleCallbackId = requestIdleCallback(
        () => {
          // Дополнительная задержка чтобы убедиться что основной контент загружен
          setTimeout(preloadBackgrounds, 1000);
        },
        { timeout: 2000 }
      );
      
      return () => cancelIdleCallback(idleCallbackId);
    } else {
      const timeoutId = setTimeout(preloadBackgrounds, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, []);

  return null;
}

function LoadingFallback() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: '#000',
      color: '#fff',
      fontFamily: 'system-ui'
    }}>
      <div>Загрузка...</div>
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<TimerPage />} />
        <Route path="/pomodoro" element={<TimerPage />} />
        <Route path="/focus-timer" element={<TimerPage />} />
        <Route path="/study-timer" element={<TimerPage />} />
        <Route path="/work-timer" element={<TimerPage />} />
        <Route path="/interval-timer" element={<TimerPage />} />
        <Route path="/minimal-timer" element={<TimerPage />} />
        <Route path="/sound-timer" element={<TimerPage />} />
        <Route path="/faq" element={<TimerPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

function App() {
  useEffect(() => {
    const handleFirstInteraction = () => {
      initAudio();
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };

    window.addEventListener("pointerdown", handleFirstInteraction);
    window.addEventListener("keydown", handleFirstInteraction);

    return () => {
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };
  }, []);

  return (
    <HelmetProvider>
      <SettingsProvider>
        <HistoryProvider>
          <FontInjector />
          <BackgroundPreloader />
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </HistoryProvider>
      </SettingsProvider>
    </HelmetProvider>
  );
}

export default App;
