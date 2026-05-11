import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import TimerPage from "@/pages/TimerPage";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { HistoryProvider } from "@/contexts/HistoryContext";

const queryClient = new QueryClient();

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
