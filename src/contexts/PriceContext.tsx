import { createContext, useContext, useState, ReactNode } from "react";

export interface Price {
  time:string,
  price:number
}

interface PriceContextType {
  price: Price[];
  setPrice: React.Dispatch<React.SetStateAction<Price[]>>;
}

const PriceContext = createContext<PriceContextType | undefined>(undefined);

const initialPrice: Price[] = [
];
export function PriceProvider({ children }: { children: ReactNode }) {
  const [price, setPrice] = useState<Price[]>(initialPrice);

  return (
    <PriceContext.Provider
      value={{
        price,
        setPrice,
      }}
    >
      {children}
    </PriceContext.Provider>
  );
}

export function usePrice() {
  const context = useContext(PriceContext);
  if (context === undefined) {
    throw new Error("usePrice must be used within a PriceProvider");
  }
  return context;
}
