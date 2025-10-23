import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Link } from "react-router-dom";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";

interface TokenCardProps {
  id: string;
  name: string;
  symbol: string;
  image: string;
  marketCap: string;
  price: string;
  priceChange: number;
}

export function TokenCard({ id, name, symbol, image, marketCap, price, priceChange }: TokenCardProps) {
  const isPositive = priceChange >= 0;
  const [sortBy, setSortBy] = useState("marketCap");

  return (
    <Link to={`/token/${id}`}>
      <Card className="p-4 bg-gradient-card hover:shadow-glow-primary transition-all duration-300 cursor-pointer group border-border">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent p-0.5 shrink-0">
            <img
              src={image}
              alt={name}
              className="w-full h-full rounded-full object-cover bg-card"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                  {name}
                </p>
                <p className="text-sm text-muted-foreground">{symbol}</p>
              </div>
              
              <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-success' : 'text-destructive'}`}>
                {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                {Math.abs(priceChange/parseFloat(price)*100||0).toFixed(1)}%
              </div>
            </div>
            
            <div className="mt-3 space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Market Cap</span>
                <span className="font-medium text-foreground">{parseFloat(marketCap).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Price</span>
                <span className="font-medium text-primary">{(parseFloat(price)*(10**10)).toFixed(2)} X 10<sup>-10</sup></span>
              </div>
            </div>
            
            <div className="mt-4 flex justify-center" onClick={(e) => e.preventDefault()}>
              <ToggleGroup type="single" value={sortBy} onValueChange={setSortBy} size="sm">
                <ToggleGroupItem value="marketCap" className="text-xs">Market Cap</ToggleGroupItem>
                <ToggleGroupItem value="volume" className="text-xs">Volume</ToggleGroupItem>
                <ToggleGroupItem value="date" className="text-xs">Date</ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
