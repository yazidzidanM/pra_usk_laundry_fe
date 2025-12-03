"use client"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import SummaryCard from "./_components/summaryCard";
import Filters from "./_components/filters";
import ChartPendapatan from "./_components/chartPendapatan";
import TableTransaksi from "./_components/tableReport";
import { useState } from "react";
import { useGetReportsByDate } from "@/hooks/report/useGetByDate";

export default  function Page() {
  const [Time, setTime] = useState({ dari: "", sampai: "" })

  const {data, isLoading, isError } = useGetReportsByDate(Time)

  const totalPendapatan = data?.reduce((a, b) => a + b.total, 0);
  const totalTransaksi = data?.length;
  const totalLunas = data?.filter((t) => t.dibayar === "dibayar").length;

  const handleTime = (time: { dari: string; sampai: string }) => {
    console.log(time)
    setTime(time)
  }

  console.log(data)
  console.log(isError)

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Laporan Transaksi</h1>

      {/* 1️⃣ Ringkasan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard title="Pendapatan" value={totalPendapatan ? `Rp ${totalPendapatan?.toLocaleString()}` : "-"} />
        <SummaryCard title="Total Transaksi" value={totalTransaksi} />
        <SummaryCard title="Transaksi Lunas" value={totalLunas} />
      </div>

      {/* 2️⃣ Filter (client component) */}
      <Filters time={handleTime}/>

      {/* 3️⃣ Chart (client component) */}
      <ChartPendapatan data={data ?? []} />

      {/* 4️⃣ Tabel (server component) */}
      <TableTransaksi data={data ?? []} />
    </div>
  );
}
