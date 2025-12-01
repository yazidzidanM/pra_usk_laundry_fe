import { z } from "zod";

export const OutletSchema = z.object({
  gambar: z.string(),
  kota: z.string(),
  nama: z.string(),
  alamat: z.string(),
  tlp: z.string(),
});

export type typeOutlet = z.infer<typeof OutletSchema>;
