"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function ChartPendapatan({ data }: { data: any[] }) {
  const chartData = {
    labels: data.map((t) => t.tgl_transaksi.split('T')[0]),
    datasets: [
      {
        label: "Pendapatan",
        data: data.map((t) => t.total),
        borderColor: "rgb(59,130,246)",
        backgroundColor: "rgba(59,130,246,0.3)",
      },
    ],
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Grafik Pendapatan</CardTitle>
      </CardHeader>
      <CardContent>
        <Line data={chartData} height={80} />
      </CardContent>
    </Card>
  );
}
