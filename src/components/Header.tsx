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
      // wrap wagmi walletClient in ethers v5 Web3Provider
      const eip1193Provider = {
        request: async ({ method, params }: { method: string; params?: any[] }) =>
          walletClient.request({ method, params } as any),
      };

      const ethersProvider = new ethers.providers.Web3Provider(eip1193Provider, 'any');
      console.log("Provider:",ethersProvider);
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
  const [connected, setConnected] = useState(false);

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-card/50 backdrop-blur-lg border-b border-border z-10">
      <div className="h-full px-6 flex items-center justify-between gap-4">
        <div className="flex-1 max-w-md flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search Tokens..."
              className="pl-10 bg-secondary border-border focus:border-primary transition-colors"
            />
          </div>
          <Button variant="default" size="default">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        <WalletProvider/>
        {/* <Button
          onClick={() => setConnected(!connected)}
          className={connected ? "bg-success hover:bg-success/90" : "bg-primary hover:bg-primary/90"}
        >
          <Wallet className="mr-2 h-4 w-4" />
          {connected ? "Connected" : "Connect Wallet"}
        </Button> */}
      </div>
    </header>
  );
}
