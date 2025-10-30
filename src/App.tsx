import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TokenProvider } from "./contexts/TokenContext";
import { PriceProvider } from "./contexts/PriceContext";
import { ProviderProvider } from "./contexts/ProviderContext";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import Tokens from "./pages/Tokens";
import Token from "./pages/Token";
import NotFound from "./pages/NotFound";

import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider ,darkTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { config } from './wagmi';

const queryClient = new QueryClient();

const App = () => (
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider theme={darkTheme()}>
        <TooltipProvider>
          <TokenProvider>
            <PriceProvider>
              <ProviderProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="tokens" element={<Tokens />} />
                    <Route path="token/:id" element={<Token />} />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
              </ProviderProvider>
            </PriceProvider>
          </TokenProvider>
        </TooltipProvider>
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);

export default App;
