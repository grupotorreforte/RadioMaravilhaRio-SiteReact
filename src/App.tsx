import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Outlet } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Home from "./pages/Home";
import OuvirAoVivo from "./pages/OuvirAoVivo";
import AssistirAoVivo from "./pages/AssistirAoVivo";
import NotFound from "./pages/NotFound";
import PlayerGlobal from "./components/PlayerGlobal";
import { radioService } from "@/lib/radioService";

const queryClient = new QueryClient();

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
