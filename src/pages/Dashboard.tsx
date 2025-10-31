import { TrendingTokenCard } from "@/components/card/TrendingTokenCard";
import { PriceChart } from "@/components/PriceChart";
import { useTokens } from "@/contexts/TokenContext";
import { useEffect } from "react";
import { Price } from "@/contexts/PriceContext";
import { useState } from "react";
import { updateTrendingTokens } from "@/lib/Tokens/updateTrendingTokens";
import { updateCurrentTokens } from "@/lib/Tokens/updateCurrentTokens";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { updateTokenState } from "@/lib/Tokens/updateTokenState";
import { RPC_provider } from "@/lib/basic/constant";
import { Link } from "react-router-dom";
import { BACKEND_WS_URL } from "@/lib/basic/constant";
export default function Dashboard() {
  const { tokens, setTokens } = useTokens();
  const [trendingTokens, setTrendingTokens] = useState([]);
  const [tableTokens, setTableTokens] = useState([]);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const ws = new WebSocket(BACKEND_WS_URL);
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

        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Image</TableHead>
                <TableHead className="min-w-[60px]">Name</TableHead>
                <TableHead className="min-w-[60px]">Symbol</TableHead>
                <TableHead className="text-right min-w-[100px]">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableTokens.slice(0, limit).map((token) => (
                <TableRow key={token.id}>
                  <Link to={`/token/${token.id}`}>
                  <TableCell>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent p-0.5">
                      <img
                        src={token.image}
                        alt={token.name}
                        className="w-full h-full rounded-full object-cover bg-card"
                      />
                    </div>
                  </TableCell>
                  </Link>
                  <TableCell className="font-medium">{token.name}</TableCell>
                  <TableCell>{token.symbol}</TableCell>
                  <TableCell className="text-right font-semibold">
                    {((parseFloat(token.price) * (10 ** 10)) / 1e18).toFixed(3)}
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
