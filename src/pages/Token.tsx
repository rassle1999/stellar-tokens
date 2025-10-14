import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PriceChart } from "@/components/PriceChart";
import { BuySellCard } from "@/components/BuySellCard";
import { mockTokens } from "@/lib/mockData";
import { Calendar, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function Token() {
  const { id } = useParams();
  const { toast } = useToast();
  const token = mockTokens.find((t) => t.id === id);

  if (!token) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Token not found</p>
      </div>
    );
  }

  const progressPercentage = (token.currentReserve / token.ethReserveCap) * 100;

  const copyAddress = () => {
    navigator.clipboard.writeText(token.address);
    toast({
      title: "Address copied!",
      description: "Token address copied to clipboard",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
      <div className="lg:col-span-2 space-y-6">
        <Card className="p-6 bg-gradient-card border-border">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent p-1 shrink-0">
              <img
                src={token.image}
                alt={token.name}
                className="w-full h-full rounded-full object-cover bg-card"
              />
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{token.name}</h1>
              <p className="text-lg text-muted-foreground mb-4">{token.symbol}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Market Cap</p>
                  <p className="text-xl font-semibold">{token.marketCap}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Price</p>
                  <p className="text-xl font-semibold text-primary">{token.price}</p>
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Created:</span>
                  <span className="font-medium">{token.createdAt}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Contract:</span>
                  <code className="bg-secondary px-2 py-1 rounded text-xs font-mono">
                    {token.address.slice(0, 10)}...{token.address.slice(-8)}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyAddress}
                    className="h-6 w-6 p-0"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card border-border">
          <h3 className="text-lg font-semibold mb-4">ETH Reserve Cap Progress</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Current Reserve</span>
              <span className="font-medium">{token.currentReserve} / {token.ethReserveCap} ETH</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <p className="text-xs text-muted-foreground">
              {progressPercentage.toFixed(1)}% filled
            </p>
          </div>
        </Card>

        <PriceChart />
      </div>

      <div>
        <BuySellCard />
      </div>
    </div>
  );
}
