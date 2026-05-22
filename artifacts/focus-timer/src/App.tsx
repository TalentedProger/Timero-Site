import { useEffect, lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
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
      <Switch>
        <Route path="/" component={TimerPage} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <SettingsProvider>
      <HistoryProvider>
        <FontInjector />
        <WouterRouter>
          <Router />
        </WouterRouter>
      </HistoryProvider>
    </SettingsProvider>
  );
}

export default App;
