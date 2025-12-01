"use server";

import { api } from "@/instance/axios";
import { loginSchema } from "@/validations/authValidation";
import { cookies } from "next/headers";

export async function loginAction(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const parsed = loginSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      error: null,
      errors: parsed.error.flatten().fieldErrors,
      data: null,
    };
  }

  try {
    const res = await api.post("/auth/login", parsed.data);
    const token = res.data.payload.data.token;

    if (!token) {
      return { success: false, error: "Invalid response from server", errors: null, data: null };
    }

    const cookieStore = await cookies();
    cookieStore.set("token", token,  { httpOnly: true, sameSite: "none", secure: true, domain: ".ngrok-free.dev", path: "/"});

    return { success: true, error: null, errors: null, data: token };
  } catch (error: any) {
    return { success: false, error: error?.response?.data?.message ?? "Login failed", errors: null, data: null };
  }
}
