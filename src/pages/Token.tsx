import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PriceChart } from "@/components/PriceChart";
import { BuySellCard } from "@/components/card/BuySellCard";
import { useTokens } from "@/contexts/TokenContext";
import { Calendar, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getBondingCurveInfo } from "@/lib/BondingCurve/getBondingCurveInfo";
import { useState, useEffect } from "react";
import { useProvider } from "@/contexts/ProviderContext";
import { getPriceInformation } from "@/lib/Token/priceInformation";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { getTokenDatabyAddress } from "@/lib/Token/tokenData";
const updateReserve = async (setReserve: any, address: string, provider: any) => {
  try {
    const reserveData = await getBondingCurveInfo(address, provider);
    setReserve(reserveData);
  } catch (error) {
    console.error("Error updating Reserve:", error);
  }
};
const updateToken = async (setToken:any,address:string) => {
  try {
    const token = await getTokenDatabyAddress(address);
    setToken(token);
  } catch (error) {
    console.error("Error updating Token:", error);
  }
}
export default function Token() {
  const { id } = useParams();
  const { toast } = useToast();
  const { tokens, getTokenById } = useTokens();
  const { walletProvider, setWalletProvider } = useProvider();
  const token = getTokenById(id || "");
  const [Reserve, setReserve] = useState({ reserveToken: "0", reserveEth: "0", tokenReserveCap: "0", ETHRESERVECAP: 5_000_000_000_000_000_000 });
  const [priceData, setPriceData] = useState([]);
  const [timeInterval, setTimeInterval] = useState("1M");

  if (!token) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Token not found</p>
      </div>
    );
  }
  useEffect(() => {
    updateReserve(setReserve, token.address, walletProvider);
    const ws = new WebSocket("ws://localhost:5010");
    ws.onmessage = (msg) => {
      const update = async () => {
        setPriceData(await getPriceInformation(token.address, timeInterval));
      }
      if(msg.data.type==1)
      update();
    }
    const fetchData = async () => {
      setPriceData(await getPriceInformation(token.address, timeInterval));
    }
    fetchData();
    return () => ws.close();
  }, []);
  const handleTimeChange = async (value: string) => {
    setTimeInterval(value);
    setPriceData(await getPriceInformation(token.address, value));
  }

  const progressPercentage = (parseFloat(Reserve.reserveEth) / Reserve.ETHRESERVECAP) * 100;

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
                  <p className="text-xl font-semibold">{(parseFloat(token.marketCap)/1e36).toFixed(3)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Price</p>
                  <p className="text-xl font-semibold text-primary">{(parseFloat(token.price)/1e18 * (10 ** 10)).toFixed(3)} X 10<sup>-10</sup></p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Created:</span>
                  <span className="font-medium">{(new Date(parseInt(token.createdAt) * 1000)).toUTCString()}</span>
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
              <span className="font-medium">{Reserve.reserveEth.toString()} / {Reserve.ETHRESERVECAP.toString()} ETH</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <p className="text-xs text-muted-foreground">
              {progressPercentage.toFixed(1)}% filled
            </p>
          </div>
        </Card>
        <div className="flex justify-center">
          <ToggleGroup type="single" value={timeInterval} onValueChange={handleTimeChange}>
            <ToggleGroupItem value="1h">1h</ToggleGroupItem>
            <ToggleGroupItem value="1D">1D</ToggleGroupItem>
            <ToggleGroupItem value="1M">1M</ToggleGroupItem>
          </ToggleGroup>
        </div>
        {priceData.length > 0 ? <PriceChart flag={false} priceData={priceData} /> : <div></div>}
      </div>

      <div>
        <BuySellCard />
      </div>
    </div>
  );
}
