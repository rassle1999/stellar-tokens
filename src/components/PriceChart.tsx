import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { useState,useEffect } from "react";
import { getPriceInformation } from "@/lib/Token/priceInformation";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
interface PriceChartProps {
  flag?: boolean;
  priceData:any[];
}
export function PriceChart({ flag ,priceData}: PriceChartProps) {
  const [timeInterval, setTimeInterval] = useState("1D");
  
  const options: ApexOptions = {
    chart: { type: "candlestick" },
    xaxis: { type: "datetime" },
    tooltip: {
      theme: "black", // ✅ force light mode tooltip (black text)
      style: {
        fontSize: "12px",
        fontFamily: "inherit",
      },
    },
  };
  const series = [
    {
      data: [
        // { x: new Date("2025-10-18T10:00:00"), y: [0.1, 0.15, 0.08, 0.12] },
        // { x: new Date("2025-10-18T10:05:00"), y: [0.12, 0.18, 0.10, 0.14] },
      ],
    },
  ];
  for(var i=0;i<priceData.length;i++){
      const price_A=parseFloat(priceData[i-1]?.price)/(10**8)||0;
      const price_B=parseFloat(priceData[i].price)/(10**8);
      series[0].data.push({x:new Date(priceData[i].time*1000),y:[price_A,price_B,price_A,price_B]})
    }
  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <ToggleGroup type="single" value={timeInterval} onValueChange={setTimeInterval}>
          <ToggleGroupItem value="1h">1h</ToggleGroupItem>
          <ToggleGroupItem value="1D">1D</ToggleGroupItem>
          <ToggleGroupItem value="1M">1M</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <Chart options={options} series={series} type="candlestick" height={350} />
    </div>
  );
}