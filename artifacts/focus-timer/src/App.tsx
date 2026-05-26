import { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { HistoryProvider } from "@/contexts/HistoryContext";
import { useSettings } from "@/hooks/useSettings";
import { getFontCss } from "@/lib/fonts";

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
  return (
    <HelmetProvider>
      <SettingsProvider>
        <HistoryProvider>
          <FontInjector />
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </HistoryProvider>
      </SettingsProvider>
    </HelmetProvider>
  );
}

export default App;
