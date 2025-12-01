"use server";

import { api } from "@/instance/axios";
import { registerSchema } from "@/validations/authValidation";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function registerAction(prevState: any, formData: FormData) {
  const data = {
    nama: formData.get("nama"),
    username: formData.get("username"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  try {
    const parsed = registerSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        errors: parsed?.error.flatten().fieldErrors,
        data: null,
      };
    }

    const { nama, username, password } = parsed.data;

    const res = await api.post("/auth/register", { nama, username, password });
    if (!res) {
      return {
        success: false,
        error: "cannot find user",
        data: null,
      };
    }

    const token = res.data.payload.data.token;
    const cookiesStore = await cookies();

    cookiesStore.set("token", token,  { httpOnly: true, sameSite: "none", secure: true , path: "/",  });

    return {
      success: true,
      error: null,
      data: res?.data?.payload?.data,
    };
  } catch (error) {
    return {
        success: false,
        errors: error,
        data: null,
      };
  }
}
