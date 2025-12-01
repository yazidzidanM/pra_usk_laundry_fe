"use client"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import SummaryCard from "./_components/summaryCard";
import Filters from "./_components/filters";
import ChartPendapatan from "./_components/chartPendapatan";
import TableTransaksi from "./_components/tableReport";
import { useState } from "react";
import { useGetReportsByDate } from "@/hooks/report/useGetByDate";

// Simulasi fetch dari database
// const data = [
//   {
//     "kode_invoice": "INV001",
//     "nama_pelanggan": "Andi",
//     "tgl_transaksi": "2023-12-01",
//     "tgl_bayar": "2023-12-05",
//     "total": 100000,
//     "dibayar": 100000,
//     "status": "LUNAS"
//   },
//   {
//     "kode_invoice": "INV002",
//     "nama_pelanggan": "Budi",
//     "tgl_transaksi": "2023-12-05",
//     "tgl_bayar": null,
//     "total": 50000,
//     "dibayar": 0,
//     "status": "BELUM LUNAS"
//   },
//   {
//     "kode_invoice": "INV003",
//     "nama_pelanggan": "Cici",
//     "tgl_transaksi": "2023-12-10",
//     "tgl_bayar": "2023-12-12",
//     "total": 200000,
//     "dibayar": 200000,
//     "status": "LUNAS"
//   },
//   {
//     "kode_invoice": "INV004",
//     "nama_pelanggan": null,
//     "tgl_transaksi": "2023-12-15",
//     "tgl_bayar": null,
//     "total": 80000,
//     "dibayar": 0,
//     "status": "BELUM LUNAS"
//   },
//   {
//     "kode_invoice": "INV005",
//     "nama_pelanggan": "Dedi",
//     "tgl_transaksi": "2023-12-20",
//     "tgl_bayar": "2023-12-22",
//     "total": 150000,
//     "dibayar": 150000,
//     "status": "LUNAS"
//   }
// ]

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
