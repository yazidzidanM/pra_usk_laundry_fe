"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function ChartPendapatanPerOutlet({ data, color }: { data: any[], color: string }) {
  console.log(data)
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Jumlah Pendapatan per Outlet</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="h-[330px] w-full">
          <ResponsiveContainer width="100%" height="100%" key={data.length}>
            <AreaChart data={data}>
              <defs>

                <linearGradient id="adminGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.1} />
                </linearGradient>
              </defs>

              <XAxis
                dataKey="id_outlet"
                stroke="#94a3b8"
                tickLine={false}
                axisLine={{ stroke: "#475569" }}
                tick={{ fill: "#cbd5e1", fontSize: 12 }}
              />
                <Tooltip
                                cursor={{ stroke: "#46ecd5", strokeWidth: 1, opacity: 0.2 }}
                                content={({ active, payload, label }) => {
                                  if (active && payload && payload.length) {
                                    return (
                                      <div className="rounded-lg border bg-background px-3 py-2 shadow-lg">
                                        <p className="text-sm text-muted-foreground">
                                          Outlet: {label}
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
              <Legend
                verticalAlign="top"
                height={36}
                wrapperStyle={{
                  paddingBottom: "12px",
                  fontSize: "13px",
                  color: "#e2e8f0",
                }}
              />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#14b8a6"
                fill="url(#adminGrad)"
                strokeWidth={2}
                animationBegin={0}
                animationDuration={1200}
                animationEasing="ease-out"
              />
            </AreaChart>

          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
