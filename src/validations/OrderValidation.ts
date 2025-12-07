import { z } from "zod";

export const pesananSchema = z.object({
  id_user: z.number().optional(),
  nama: z.string().min(1, "Nama wajib diisi"),
  jenis_kelamin: z.string().min(1, "Jenis kelamin wajib dipilih"),
  alamat: z.string().min(1, "Alamat wajib diisi"),
  tlp: z.string().min(12, "Nomor wajib diisi").regex(/^08[0-9]{10,14}$/, "Nomor telfon harus angka"),

  id_outlet: z.number().min(1, "Outlet wajib dipilih"),
  id_paket: z.number().min(1, "Paket wajib dipilih"),
  jenis: z.string().min(1, "jenis wajib ada"),
  nama_paket: z.string().min(1, "nama paket wajib ada"),

  qty: z
    .number()
    .positive("Qty minimal 1")
    .min(1, "Qty minimal 1"),

  keterangan: z.string().optional(),

  harga: z.number().optional(),
  harga_total: z.number().optional(),
});

export type TPesananForm = z.infer<typeof pesananSchema>;
