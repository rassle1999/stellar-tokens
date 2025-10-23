import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "react-router-dom";
import { useTokens } from "@/contexts/TokenContext";
import { buy, sell } from "@/lib/BuySell/buy";
import { useProvider } from "@/contexts/ProviderContext";
import { ethers } from "ethers";
export function BuySellCard() {
  const { id } = useParams();
  const [mode, setMode] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState("");
  const { toast } = useToast();
  const { getTokenById } = useTokens();
  const { walletProvider, setWalletProvider } = useProvider();
  const token = getTokenById(id || "");
  console.log("BUYSELL:", token.address);
  const handleTransaction = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }
    const signer = await walletProvider.getSigner();
    const walletAddress = await signer.getAddress();
    let success;
    if (mode == "buy") {
      success = await buy(token.address, ethers.BigNumber.from(ethers.utils.parseEther(amount)), walletAddress, signer);
    }
    else {
      success = await sell(token.address, ethers.BigNumber.from(ethers.utils.parseEther(amount)), walletAddress, signer);
    }
    if (success) {
      toast({
        title: `${mode === "buy" ? "Purchase" : "Sale"} Successful`,
        description: `You have ${mode === "buy" ? "bought" : "sold"} ${amount} tokens`,
      });
    }
    else{
      toast({
        title: `${mode === "buy" ? "Purchase" : "Sale"} Failed`,
        description: `You haven't ${mode === "buy" ? "bought" : "sold"} ${amount} tokens`,
      });
    }


    setAmount("");
  };

  return (
    <Card className="p-6 bg-gradient-card border-border sticky top-20">
      <Tabs value={mode} onValueChange={(v) => setMode(v as "buy" | "sell")} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-secondary">
          <TabsTrigger
            value="buy"
            className="data-[state=active]:bg-success data-[state=active]:text-success-foreground"
          >
            Buy
          </TabsTrigger>
          <TabsTrigger
            value="sell"
            className="data-[state=active]:bg-destructive data-[state=active]:text-destructive-foreground"
          >
            Sell
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount (ETH)</Label>
          <Input
            id="amount"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-secondary border-border text-lg"
          />
        </div>

        <div className="p-3 bg-secondary rounded-lg">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">You will receive</span>
            <span className="font-medium">~{amount ? (parseFloat(amount) * 1000).toFixed(2) : "0.00"} tokens</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Fee</span>
            <span className="font-medium">0.3%</span>
          </div>
        </div>

        <Button
          onClick={handleTransaction}
          className={`w-full ${mode === "buy"
              ? "bg-success hover:bg-success/90"
              : "bg-destructive hover:bg-destructive/90"
            }`}
        >
          {mode === "buy" ? "Buy" : "Sell"}
        </Button>
      </div>
    </Card>
  );
}
