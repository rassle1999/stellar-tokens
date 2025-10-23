import { TrendingTokenCard } from "@/components/TrendingTokenCard";
import { PriceChart } from "@/components/PriceChart";
import { useTokens } from "@/contexts/TokenContext";
// import { updateTokens } from "@/lib/Tokens/updateCurrentTokens";
import { useEffect } from "react";
import { getTotalPriceInformation } from "@/lib/Token/priceInformation";
import { Price } from "@/contexts/PriceContext";
import { useState } from "react";
export default function Dashboard() {
  const { tokens ,setTokens } = useTokens();
  const [ sumData, setSumData] = useState([]);
  const { getTrendingTokens } = useTokens();
  const trendingTokens = getTrendingTokens();
  let prices:Price[];
  // useEffect(() => {
    
  //     const fetchTotalPrice = async () =>{
  //       const sumData1=await updateTokens(setTokens);
  //       prices =await  getTotalPriceInformation(sumData1);
  //       setSumData(sumData1);
  //     }
  //     fetchTotalPrice();
  //   }, []);
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
