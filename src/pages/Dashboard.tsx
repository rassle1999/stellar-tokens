import { TrendingTokenCard } from "@/components/TrendingTokenCard";
import { PriceChart } from "@/components/PriceChart";
import { useTokens } from "@/contexts/TokenContext";

export default function Dashboard() {
  const { getTrendingTokens } = useTokens();
  const trendingTokens = getTrendingTokens();

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

      <PriceChart />
    </div>
  );
}
