import { createContext, useContext, useState, ReactNode } from "react";
import { ethers } from "ethers";
interface ProviderContextType {
  walletProvider: ethers.providers.Web3Provider|null;
  setWalletProvider: React.Dispatch<React.SetStateAction<ethers.providers.Web3Provider>>;
}

const ProviderContext = createContext<ProviderContextType | undefined>(undefined);

export function ProviderProvider({ children }: { children: ReactNode }) {
  const [walletProvider, setWalletProvider] = useState<ethers.providers.Web3Provider>(null);

  return (
    <ProviderContext.Provider
      value={{
        walletProvider,
        setWalletProvider,
      }}
    >
      {children}
    </ProviderContext.Provider>
  );
}

export function useProvider() {
  const context = useContext(ProviderContext);
  if (context === undefined) {
    throw new Error("usePrice must be used within a ProviderProvider");
  }
  return context;
}
