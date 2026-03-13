import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Home from "./pages/Home";
import OuvirAoVivo from "./pages/OuvirAoVivo";
import AssistirAoVivo from "./pages/AssistirAoVivo";
import NotFound from "./pages/NotFound";
import PlayerGlobal from "./components/PlayerGlobal";
import { radioService } from "@/lib/radioService";
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}
const queryClient = new QueryClient();
const AnalyticsTracker = () => {
  const location = useLocation();
  
  useEffect(() => {
    if (typeof window.gtag === "function") {
      window.gtag("config", "G-F6EWKM5E44", {
        page_path: location.pathname,
      });
    }
  }, [location]);

  return null;
};
const Layout = () => {
  const [playerAtivo, setPlayerAtivo] = useState(radioService.getGlobalPlayerActive());

  useEffect(() => {
    const interval = setInterval(() => {
      const ativo = radioService.getGlobalPlayerActive();
      if (ativo !== playerAtivo) setPlayerAtivo(ativo);
    }, 500);

    return () => clearInterval(interval);
  }, [playerAtivo]);

  return (
    <>
      <Outlet />
      {playerAtivo && <PlayerGlobal />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="white" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AnalyticsTracker />

        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/ouvir-ao-vivo" element={<OuvirAoVivo />} />
            <Route path="/assistir-ao-vivo" element={<AssistirAoVivo />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
