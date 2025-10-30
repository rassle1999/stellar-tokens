import { Search, Wallet, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { WagmiConfig, useAccount, useWalletClient } from 'wagmi';
import { ethers } from "ethers";
import { useProvider } from "@/contexts/ProviderContext";
import { useEffect } from "react";
function WalletProvider() {
  const { data: walletClient } = useWalletClient();
  const { address, isConnected } = useAccount();
  const { walletProvider, setWalletProvider } = useProvider();
  useEffect(() => {
    if (walletClient) {
      const eip1193Provider = {
        request: async ({ method, params }: { method: string; params?: any[] }) =>
          walletClient.request({ method, params } as any),
      };
      const ethersProvider = new ethers.providers.Web3Provider(eip1193Provider, 'any');
      setWalletProvider(ethersProvider);
    }
  }, [walletClient]);

  return (
    <div>
      <ConnectButton />
    </div>
  );
}
export function Header({ onMenuClick }: { onMenuClick?: () => void }) {

  return (
    <header className="fixed top-0 left-0 md:left-64 right-0 h-16 bg-card/50 backdrop-blur-lg border-b border-border z-10">
      <div className="h-full px-4 md:px-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick}>
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-lg md:text-xl font-semibold">LaunchPad</h1>
        </div>
        <WalletProvider/>
      </div>
    </header>
  );
}
