"use client";

import { jwtDecode } from "jwt-decode";

export interface Idecoded {
  id: number;
  nama: string;
  username: string;
  role: string;
}

// ambil cookie manual via document.cookie
export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="));

  return match ? match.split("=")[1] : null;
}

export function getUserFromClientCookie(): Idecoded | null {
  const token = getCookie("token");
  if (!token) return null;

  try {
    // HANYA decode payload (tanpa verify)
    const decoded = jwtDecode<Idecoded>(token);
    return decoded;
  } catch (e) {
    console.error("Invalid token:", e);
    return null;
  }
}
