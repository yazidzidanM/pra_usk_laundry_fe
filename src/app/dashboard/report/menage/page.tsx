"use client"
import SummaryCard from "./_components/summaryCard";
import Filters from "./_components/filters";
import ChartPendapatan from "./_components/chartPendapatan";
import TableTransaksi from "./_components/tableReport";
import { useEffect, useState } from "react";
import { TReport, useGetReportsByDate } from "@/hooks/report/useGetByDate";
import { AnimatedCounter } from "@/animations/animate";
export interface IChartPendapatan extends TReport {
  tanggal: string,
  jumlah: number
}

export default function Page() {
  const [Time, setTime] = useState({ dari: "", sampai: "" })
  const { data } = useGetReportsByDate(Time)

  //data summary
  const totalLunas = data?.filter((t) => t.dibayar === "dibayar");
  const totalPendapatan = totalLunas?.reduce((a, b) => a + b.total, 0);
  const totalTransaksi = data?.length;

  //handle data chart
  const chartData = data?.map(({ tgl_transaksi, ...item }) => {
    const tanggal = tgl_transaksi.split("T")[0]
    return {
      ...item,
      tanggal
    }
  }).filter((a) => a.dibayar === "dibayar")
    .reduce<Record<string, IChartPendapatan>>((acc, curr: any) => {
      if (!acc[curr.tanggal]) {
        acc[curr.tanggal] = {
          ...curr,
          tanggal: curr.tanggal,
          total: curr.total,
          jumlah: 1
        };
      } else {
        acc[curr.tanggal].total += curr.total;
        acc[curr.tanggal].jumlah += 1;
      }
      return acc;
    }, {});
  const result = Object.values(chartData ?? []) as IChartPendapatan[];

  //handle date fetching
  const handleTime = (time: { dari: string; sampai: string }) => {
    console.log(time)
    setTime(time)
  }

  //handle data table
  const limit = 10;
  const [page, setPage] = useState(1);
  const totalPage = Math.ceil((data?.length ?? 1) / limit);

  const start = (page - 1) * limit;
  const end = start + limit;
  const sliced = data?.slice(start, end);

  const handlePrev = () => {
    setPage((p) => p - 1)
  }
  const handleNext = () => {
    setPage((p) => p + 1)
  }

  // console.log(data)
  // console.log(isError)

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Laporan Transaksi</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard title="Pendapatan" value={<>Rp <AnimatedCounter target={totalPendapatan ?? 0} duration={1000} /></>} />
        <SummaryCard title="Total Transaksi" value={<AnimatedCounter target={totalTransaksi ?? 0} duration={1000} />} />
        <SummaryCard title="Transaksi Dibayar" value={<AnimatedCounter target={totalLunas?.length ?? 0} duration={1000} />} />
      </div>

      <Filters time={handleTime} />

      <ChartPendapatan data={result ?? []} />

      <TableTransaksi
        data={sliced ?? []}
        page={page}
        totalPage={totalPage}
        prev={handlePrev}
        next={handleNext}
      />
    </div>
  );
}
