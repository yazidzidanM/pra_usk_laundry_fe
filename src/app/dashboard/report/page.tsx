"use client"
import { TReport, useGetReportsByDate } from "@/hooks/report/useGetByDate";
import ChartPendapatanPerOutlet from "./_components/ChartPendapatan";
import { useState } from "react";
import { groupUsersByOutlet } from "./_components/grouping";
import { generateRandomColor } from "./_components/colorGenerate";
import { IChartPendapatan } from "./menage/page";

export default function ReportPage(){
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const dateToday = `${year}-${month}-${day}`;
  const [tanggal, setTanggal] = useState({ dari: "2025-11-27", sampai: dateToday.split("T")[0] });
  const { data } = useGetReportsByDate(tanggal)
  const grouped = data?.filter((i) => i.dibayar === "dibayar").reduce<Record<string, TReport>>((acc, curr: any) => {
    if (!acc[curr.id_outlet]) {
          acc[curr.id_outlet] = {
            ...curr,
            id_outlet: curr.id_outlet,
            total: curr.total,
          };
        } else {
          acc[curr.id_outlet].total += curr.total;
        }
        return acc;
  }, {})

  const result = Object.values(grouped ?? []) as TReport[]
  const color = generateRandomColor('7bf1a8', '016630')
  // console.log(grouped)
  console.log(result)
  return (
    <div>
      <ChartPendapatanPerOutlet data={result} color={color}/>
    </div>
  )
}