import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Link } from "react-router-dom";

interface TrendingTokenCardProps {
  id: string;
  name: string;
  symbol: string;
  image: string;
  price: string;
  priceChange: number;
}

export function TrendingTokenCard({ id, name, symbol, image, price, priceChange }: TrendingTokenCardProps) {
  const isPositive = priceChange >= 0;

  return (
    <Link to={`/token/${id}`}>
      <Card className="min-w-[200px] p-4 bg-gradient-card hover:shadow-glow-primary transition-all duration-300 cursor-pointer group border-border">
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent p-0.5 shrink-0">
            <img
              src={image}
              alt={name}
              className="w-full h-full rounded-full object-cover bg-card"
            />
          </div>
          
          <div>
            <h5 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
              {name}
            </h5>
            <p className="text-xs text-muted-foreground">{symbol}</p>
          </div>
          
          <div className="w-full space-y-0">
            <div className="text-sm font-semibold text-primary">{((parseFloat(price)*(10**10))/1e18).toFixed(2)}</div>
            
            <div className={`flex items-center justify-center gap-1 text-xs font-medium ${isPositive ? 'text-success' : 'text-destructive'}`}>
              {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {Math.abs(priceChange/parseFloat(price)*100||0).toFixed(1)}%
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
