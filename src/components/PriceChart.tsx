import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
interface PriceChartProps {
  flag?: boolean;
  priceData: any[];
}
export function PriceChart({ flag, priceData }: PriceChartProps) {

  const options: ApexOptions = {
    chart: { type: "candlestick" },
    xaxis: { type: "datetime" },
    yaxis: {
      labels: {
        formatter: (value: number) => value.toFixed(3),
      },
    },
    tooltip: {
      theme: "black",
      style: {
        fontSize: "12px",
        fontFamily: "inherit",
      },
    },
  };
  const series = [
    {
      data: [
      ],
    },
  ];
  const price_A = parseFloat(priceData[0].price) / (10 ** 8) || 0;
  // series[0].data.push({ x: new Date(priceData[0].time * 1000), y: [price_A, price_A, price_A, price_A] })
  for (var i = 1; i < priceData.length; i++) {
    const price_A = parseFloat(priceData[i - 1].price) / (10 ** 8) || 0;
    const price_B = parseFloat(priceData[i].price) / (10 ** 8);
    series[0].data.push({ x: new Date(priceData[i].time * 1000), y: [price_A, price_B, price_A, price_B] })
  }
  return (
    <div className="space-y-4">
      <Chart options={options} series={series} type="candlestick" height={350} />
    </div>
  );
}