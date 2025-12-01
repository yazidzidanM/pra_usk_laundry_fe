"use server"

import { api } from "@/instance/axios";
import { usersSchema } from "@/validations/UsersValidation"

export async function AddUserAction(prevState: any, formData: FormData){
  const data = {
    nama: formData.get("nama"),
    username: formData.get("username"),
    password: formData.get("password"),
    id_outlet: Number(formData.get("id_outlet")),
    role: formData.get("role"),
  };

  try {
    const parsed = usersSchema.safeParse(data);

    if (!parsed.success){
      return {
        success: false,
        errors: parsed.error.flatten().fieldErrors,
        data: null,
      };
    }

    const res = await api.post("/user", parsed.data);

    if (!res || !res.data || !res.data.payload) {
      return {
        success: false,
        error: "Invalid response from server",
        data: null,
      };
    }

    return {
      success: true,
      errors: null,
      data: res.data.payload,
    };
  } catch (err) {
    console.error("AddUser error:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
      data: null,
    };
  }
}
