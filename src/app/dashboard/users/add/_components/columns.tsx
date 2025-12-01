"use client"

import { ColumnDef } from "@tanstack/react-table"

export interface IOutlet {
  id?: number;
  gambar: string;
  kota: string;
  nama: string;
  alamat: string;
  tlp: string;
}

export const columns: ColumnDef<IOutlet>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "kota",
    header: "Kota",
  },
]