import { z } from "zod";

const nameRegex = /^[A-Za-z\s]+$/;

const alphaNumRegex = /^[A-Za-z0-9]+$/;

export const registerSchema = z
  .object({
    nama: z
      .string()
      .min(1, "Nama wajib diisi")
      .regex(nameRegex, "Nama hanya boleh mengandung huruf dan spasi"),

    username: z
      .string()
      .min(1, "Username wajib diisi")
      .min(6, "Username minimal 4 karakter")
      .regex(alphaNumRegex, "Username hanya boleh huruf dan angka")
      .regex(/[A-Z]/, "Username harus memiliki minimal 1 huruf kapital")
      .regex(/[0-9]/, "Username harus memiliki minimal 1 angka"),

    password: z
      .string()
      .min(1, "Password wajib diisi")
      .min(6, "Password minimal 6 karakter")
      .regex(alphaNumRegex, "Password hanya boleh huruf dan angka")
      .regex(/[A-Z]/, "Password harus memiliki minimal 1 huruf kapital")
      .regex(/[0-9]/, "Password harus memiliki minimal 1 angka"),

    confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password dan konfirmasi password tidak sesuai",
    path: ["confirmPassword"],
  });

export type typeRegister = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, "Username wajib diisi")
    .regex(alphaNumRegex, "Username hanya boleh huruf dan angka"),

  password: z
    .string()
    .min(1, "Password wajib diisi")
    .regex(alphaNumRegex, "Password hanya boleh huruf dan angka"),
});

export type typeLogin = z.infer<typeof loginSchema>;
