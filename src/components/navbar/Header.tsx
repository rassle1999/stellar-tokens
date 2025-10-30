import { Search, Wallet } from "lucide-react";
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
export function Header() {

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-card/50 backdrop-blur-lg border-b border-border z-10">
      <div className="h-full px-6 flex items-center justify-between gap-4">
        <h1>LaunchPad</h1>
        <WalletProvider/>
      </div>
    </header>
  );
}
