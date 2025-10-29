import { TrendingTokenCard } from "@/components/card/TrendingTokenCard";
import { PriceChart } from "@/components/PriceChart";
import { useTokens } from "@/contexts/TokenContext";
import { useEffect } from "react";
import { Price } from "@/contexts/PriceContext";
import { useState } from "react";
import { updateTrendingTokens } from "@/lib/Tokens/updateTrendingTokens";
import { getDashChartData } from "@/lib/chart/dashChartData";
export default function Dashboard() {
  const { tokens ,setTokens } = useTokens();
  const [ sumData, setSumData] = useState([]);
  const { getTrendingTokens } = useTokens();
  const [trendingTokens,setTrendingTokens] = useState([]);
  useEffect(()=>{
    const fetchData = async () =>{
      await updateTrendingTokens(setTrendingTokens);
      // await getDashChartData();
    }
    fetchData();
  },[])
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
      {/* {sumData.length!=0?<PriceChart flag={true} sumData={sumData}/>:<div>No Graph</div>} */}
    </div>
  );
}
