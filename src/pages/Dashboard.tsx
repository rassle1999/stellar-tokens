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
  const { tokens ,setTokens } = useTokens();
  const [trendingTokens,setTrendingTokens] = useState([]);
  const [tableTokens, setTableTokens] = useState([]);
  const [limit, setLimit] = useState(10);
  
  useEffect(()=>{
    const fetchData = async () =>{
      await updateTrendingTokens(setTrendingTokens);
      await updateTokenState(setTableTokens, 10,RPC_provider);
    }
    fetchData();
  },[])
  
  const handleLimitChange = async () => {
    await updateTokenState(setTableTokens, limit,RPC_provider);
  };
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
        <div className="flex items-end gap-4">
          <div className="flex-1 max-w-xs">
            <Label htmlFor="limit">Show Limit</Label>
            <div className="flex gap-2">
              <Input
                id="limit"
                type="number"
                min="1"
                value={limit}
                onChange={(e) => setLimit(parseInt(e.target.value) || 10)}
                className="w-full"
              />
              <Button onClick={handleLimitChange}>Apply</Button>
            </div>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Symbol</TableHead>
                <TableHead>Address</TableHead>
                {/* <TableHead>Migrate</TableHead> */}
                <TableHead className="text-right">Price</TableHead>
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
                  {/* <TableCell>
                    <Badge variant={token.isMigrated ? "default" : "secondary"}>
                      {token.isMigrated ? "Migrated" : "Active"}
                    </Badge>
                  </TableCell> */}
                  <TableCell className="text-right font-semibold">
                    {((parseFloat(token.price)*(10**10))/1e18).toFixed(6)}
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
