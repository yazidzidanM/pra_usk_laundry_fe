// schemas/paketSchema.ts
import { z } from "zod";

export const paketSchema = z.object({
  id_outlet: z.number().min(1, "Outlet wajib dipilih"),
  jenis: z.string().min(1, "Jenis wajib dipilih"),
  nama_paket: z.string().min(1, "Nama paket tidak boleh kosong"),
  harga: z.number().min(1000, "Harga minimal 1000"),
});

export type TPaketForm = z.infer<typeof paketSchema>;
