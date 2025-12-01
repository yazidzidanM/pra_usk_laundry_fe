import {z} from "zod";

const nameRegex = /^[A-Za-z\s]+$/;

const alphaNumRegex = /^[A-Za-z0-9]+$/;

export const usersSchema = z.object({
  nama: z
    .string()
    .min(1, "Nama wajib diisi")
    .regex(/^[A-Za-z\s]+$/, "Nama hanya boleh mengandung huruf dan spasi"),

  username: z
    .string()
    .min(1, "Username wajib diisi")
    .min(4, "Username minimal 4 karakter")
    .regex(/^[A-Za-z0-9]+$/, "Username hanya boleh huruf dan angka"),

  password: z
    .string()
    .min(1, "Password wajib diisi")
    .min(6, "Password minimal 6 karakter")
    .regex(/^[A-Za-z0-9]+$/, "Password hanya boleh huruf dan angka"),

  id_outlet: z.number().min(1, "Outlet wajib dipilih"),

  role: z.string().min(1, "Role wajib diisi"),
});

export type typeUsers = z.infer<typeof usersSchema>;

export const updateUserSchema = z.object({
  nama: z
    .string()
    .min(1, "Nama wajib diisi")
    .regex(/^[A-Za-z\s]+$/, "Nama hanya boleh mengandung huruf dan spasi"),

  username: z
    .string()
    .min(1, "Username wajib diisi")
    .min(4, "Username minimal 4 karakter")
    .regex(/^[A-Za-z0-9]+$/, "Username hanya boleh huruf dan angka"),

  id_outlet: z.number().min(1, "Outlet wajib dipilih"),

  role: z.string().min(1, "Role wajib diisi"),
});

export type typeUpdateUser = z.infer<typeof updateUserSchema>;
