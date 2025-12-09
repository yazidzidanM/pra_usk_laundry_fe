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

export default function ChartRolePerOutlet({ data }: { data: any[] }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Jumlah Pengguna per Outlet</CardTitle>
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

                <linearGradient id="kasirGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1} />
                </linearGradient>

                <linearGradient id="ownerGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1} />
                </linearGradient>

                <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
                </linearGradient>
              </defs>

              <XAxis
                dataKey="outlet"
                stroke="#94a3b8"
                tickLine={false}
                axisLine={{ stroke: "#475569" }}
                tick={{ fill: "#cbd5e1", fontSize: 12 }}
              />
              <Tooltip
                cursor={{ stroke: "#fff", strokeWidth: 1, opacity: 0.1 }}
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background px-3 py-2 shadow-lg">
                        <p className="text-sm text-muted-foreground">{label}</p>

                        {payload.map((item, i) => (
                          <div key={i} className="flex items-center gap-2 mt-1">
                            <span
                              className="h-2 w-2 rounded-full"
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="text-sm text-foreground font-medium">
                              {item.dataKey}: {item.value}
                            </span>
                          </div>
                        ))}
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
                dataKey="admin"
                stroke="#14b8a6"
                fill="url(#adminGrad)"
                strokeWidth={2}
                animationBegin={0}
                animationDuration={1200}
                animationEasing="ease-out"
              />

              <Area
                type="monotone"
                dataKey="kasir"
                stroke="#6366f1"
                fill="url(#kasirGrad)"
                strokeWidth={2}
                animationBegin={300}
                animationDuration={1200}
                animationEasing="ease-out"
              />

              <Area
                type="monotone"
                dataKey="owner"
                stroke="#f59e0b"
                fill="url(#ownerGrad)"
                strokeWidth={2}
                animationBegin={500}
                animationDuration={1200}
                animationEasing="ease-out"
              />

              <Area
                type="monotone"
                dataKey="user"
                stroke="#ef4444"
                fill="url(#userGrad)"
                strokeWidth={2}
                animationBegin={700}
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
