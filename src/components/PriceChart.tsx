import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const generateMockData = () => {
  const data = [];
  const now = Date.now();
  for (let i = 24; i >= 0; i--) {
    data.push({
      time: new Date(now - i * 3600000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      price: Math.random() * 50 + 50,
    });
  }
  return data;
};

export function PriceChart() {
  const data = generateMockData();

  return (
    <Card className="p-6 bg-gradient-card border-border">
      <h3 className="text-lg font-semibold mb-4">Price Change Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="time"
            stroke="hsl(var(--muted-foreground))"
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
            labelStyle={{ color: 'hsl(var(--foreground))' }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
