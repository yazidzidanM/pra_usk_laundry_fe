"use server";

import { cookies, headers } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

export interface Idecoded {
  id: number;
  nama: string;
  username: string;
  role: string;
}

export async function getUserFromCookie(): Promise<Idecoded | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const h = await headers();
  const isPrefetch =
    h.get("rsc") === "1" || h.get("next-router-prefetch") === "1";

  // ⛔ FIX: JIKA PREFETCH, JANGAN PERNAH REDIRECT
  if (isPrefetch) {
    return null;
  }

  // ⛔ FIX: JIKA TIDAK ADA TOKEN, REDIRECT
  if (!token) {
    redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as Idecoded;
    return decoded;
  } catch {
    redirect("/login");
  }
}
