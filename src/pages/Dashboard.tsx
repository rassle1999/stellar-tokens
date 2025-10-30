import { TrendingTokenCard } from "@/components/card/TrendingTokenCard";
import { PriceChart } from "@/components/PriceChart";
import { useTokens } from "@/contexts/TokenContext";
import { useEffect } from "react";
import { Price } from "@/contexts/PriceContext";
import { useState } from "react";
import { updateTrendingTokens } from "@/lib/Tokens/updateTrendingTokens";
import { updateCurrentTokens } from "@/lib/Tokens/updateCurrentTokens";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { updateTokenState } from "@/lib/Tokens/updateTokenState";
import { RPC_provider } from "@/lib/basic/constant";
export default function Dashboard() {
  const { tokens, setTokens } = useTokens();
  const [trendingTokens, setTrendingTokens] = useState([]);
  const [tableTokens, setTableTokens] = useState([]);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5010");
    ws.onmessage = (msg) => {
      const update = async () => {
        console.log("updating...");
        await updateTrendingTokens(setTrendingTokens);
        await updateTokenState(setTableTokens, 10, RPC_provider);
      }
      console.log("broadcast is arrived", msg);
      update();
    }
    const fetchData = async () => {
      await updateTrendingTokens(setTrendingTokens);
      await updateTokenState(setTableTokens, 10, RPC_provider);
    }
    fetchData();
  }, [])
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Track trending tokens and market performance</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Trending Tokens</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-primary scrollbar-track-secondary">
          {trendingTokens.map((token) => (
            <TrendingTokenCard key={token.id} {...token} />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-end gap-2">
          <div className="flex-1 max-w-xs space-y-2">
            <Label htmlFor="limit">Show Limit</Label>
            <Input
              id="limit"
              type="number"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              min="1"
              className="bg-secondary"
            />
          </div>
          <Button onClick={() => updateTokenState(setTableTokens, limit, RPC_provider)}>
            Apply
          </Button>
        </div>

        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Image</TableHead>
                <TableHead className="min-w-[120px]">Name</TableHead>
                <TableHead className="min-w-[80px]">Symbol</TableHead>
                <TableHead className="min-w-[140px]">Address</TableHead>
                <TableHead className="text-right min-w-[100px]">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableTokens.slice(0, limit).map((token) => (
                <TableRow key={token.id}>
                  <TableCell>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent p-0.5">
                      <img
                        src={token.image}
                        alt={token.name}
                        className="w-full h-full rounded-full object-cover bg-card"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{token.name}</TableCell>
                  <TableCell>{token.symbol}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <code className="text-xs">{token.address?.slice(0, 6)}...{token.address?.slice(-4)}</code>
                      <Button variant="ghost" size="icon" className="h-6 w-6" asChild>
                        <a href={`https://etherscan.io/address/${token.address}`} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {((parseFloat(token.price) * (10 ** 10)) / 1e18).toFixed(6)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* {sumData.length!=0?<PriceChart flag={true} sumData={sumData}/>:<div>No Graph</div>} */}
    </div>
  );
}
