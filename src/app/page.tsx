"use client"

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/menageState/zustandStore";

import Link from "next/link"
export default function Home() {
  const user = useAuthStore((u) => u.user)
  
  return (
    <div className="bg-muted flex flex-col items-center justify-center h-screen space-y-4">
    <a className="text-4xl font-semibold">Welcome To Laundry {user?.nama}</a>
      <Link href="/dashboard">
        <Button className="flex w-full justify-center items-center bg-teal-500 text-white px-8 py-2 text-xl ">Access Dashboard</Button>
      </Link>
    </div>
  );
}
