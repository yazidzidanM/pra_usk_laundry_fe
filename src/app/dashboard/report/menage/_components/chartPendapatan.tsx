"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ChartPendapatan({ data }: { data: any[] }) {
  const chartData = data.map((t) => ({
    tanggal: t.tanggal,
    total: t.total,
  }));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Grafik Pendapatan</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer
            width="100%"
            height="100%"
            key={chartData.length}
          >
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="tealGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#46ecd5" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#46ecd5" stopOpacity={0.1} />
                </linearGradient>
              </defs>

              <XAxis
              dataKey="tanggal"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
              <Tooltip
                cursor={{ stroke: "#46ecd5", strokeWidth: 1, opacity: 0.2 }}
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background px-3 py-2 shadow-lg">
                        <p className="text-sm text-muted-foreground">
                          {new Date(label).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: payload[0].color }}
                          ></span>

                          <p className="text-sm font-medium text-foreground">
                            Rp {payload[0]?.value?.toLocaleString("id-ID")}
                          </p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#46ecd5"
                fill="url(#tealGradient)"
                isAnimationActive={true}
                animationDuration={800}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
