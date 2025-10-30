import { createContext, useContext, useState, ReactNode } from "react";

export interface Token {
  id: string;
  name: string;
  symbol: string;
  image: string;
  marketCap: string;
  price: string;
  priceChange: number;
  createdAt: string;
  address: string;
  ethReserveCap?: number;
  currentReserve?: number;
}
export const NullToken = () => {
  return {
    id: "",
    name: "",
    symbol: "",
    image: "",
    marketCap: "",
    price: "",
    priceChange: 0,
    createdAt: "",
    address: ""
  }
}
interface TokenContextType {
  tokens: Token[];
  setTokens: React.Dispatch<React.SetStateAction<Token[]>>;
  addToken: (token: Omit<Token, "id" | "createdAt" | "address">) => void;
  getTokenById: (id: string) => Token | undefined;
  getTrendingTokens: () => Token[];
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

const initialTokens: Token[] = [
];

export function TokenProvider({ children }: { children: ReactNode }) {
  const [tokens, setTokens] = useState<Token[]>(initialTokens);

  const addToken = (tokenData: Omit<Token, "id" | "createdAt" | "address">) => {
    const newToken: Token = {
      ...tokenData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      address: `0x${Math.random().toString(16).substr(2, 40)}`,
    };
    setTokens((prev) => [newToken, ...prev]);
  };

  const getTokenById = (id: string) => {
    return tokens.find((token) => token.id.toLowerCase() === id.toLowerCase());
  };

  const getTrendingTokens = () => {
    return tokens.filter((token) => token.priceChange > 0).slice(0, 5);
  };

  return (
    <TokenContext.Provider
      value={{
        tokens,
        setTokens,
        addToken,
        getTokenById,
        getTrendingTokens,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
}

export function useTokens() {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error("useTokens must be used within a TokenProvider");
  }
  return context;
}
