"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

export interface Idecoded {
  id: number;
  nama: string;
  username: string;
  role: string;
}

export async function getUserFromCookie(): Promise<Idecoded> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login")
  };

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as Idecoded;
    return decoded;
  } catch {
    redirect("/login");
  }
}
