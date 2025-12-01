"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface IFilters {
  time: (tanggal: { dari: string; sampai: string }) => void;
}

export default function Filters({time}: IFilters) {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const dateToday = `${year}-${month}-${day}`;

  const [tanggal, setTanggal] = useState({ dari: "2025-11-27", sampai: dateToday.split("T")[0] });

  useEffect(() => {
    time(tanggal)
    console.log(tanggal)
  }, [tanggal])

  return (
    <div className="flex gap-4 flex-wrap">
      <div className="flex flex-col gap-1">
        <Label>Dari Tanggal</Label>
        <Input
          type="date"
          onChange={(e) =>
            setTanggal((t) => ({ ...t, dari: e.target.value }))
          }
          defaultValue={"2025-11-27"}
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label>Sampai Tanggal</Label>
        <Input
          type="date"
          onChange={(e) =>
            setTanggal((t) => ({ ...t, sampai: e.target.value }))
          }
          defaultValue={dateToday}
        />
      </div>

      <div className="flex items-end">
        <Button>Export PDF</Button>
      </div>
    </div>
  );
}
