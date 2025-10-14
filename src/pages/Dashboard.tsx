import { TokenCard } from "@/components/TokenCard";
import { PriceChart } from "@/components/PriceChart";
import { mockTokens } from "@/lib/mockData";

export default function Dashboard() {
  const trendingTokens = mockTokens.filter(token => token.priceChange > 0).slice(0, 5);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Track trending tokens and market performance</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Trending Tokens</h2>
        <div className="max-h-[500px] overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-primary scrollbar-track-secondary">
          {trendingTokens.map((token) => (
            <TokenCard key={token.id} {...token} />
          ))}
        </div>
      </div>

      <PriceChart />
    </div>
  );
}
