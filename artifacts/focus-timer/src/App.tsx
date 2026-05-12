import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import TimerPage from "@/pages/TimerPage";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { HistoryProvider } from "@/contexts/HistoryContext";
import { useSettings } from "@/hooks/useSettings";
import { getFontCss } from "@/lib/fonts";

const queryClient = new QueryClient();

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

function Router() {
  return (
    <Switch>
      <Route path="/" component={TimerPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SettingsProvider>
        <HistoryProvider>
          <FontInjector />
          <TooltipProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </HistoryProvider>
      </SettingsProvider>
    </QueryClientProvider>
  );
}

export default App;
