"use client"

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/menageState/zustandStore";

import Link from "next/link"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Home() {
  const user = useAuthStore((u) => u.user)
  const router = useRouter()
  useEffect(() => {
    if(!user){
      router.push("/login")
    }
  }, [user])
  
  return (
    <div className="bg-muted flex flex-col items-center justify-center h-screen space-y-6">
    <a className="text-xl md:text-4xl font-semibold">Welcome To Laundry {user?.nama}</a>
      <Link href="/dashboard">
        <Button className="flex w-full justify-center items-center bg-teal-500 text-white px-6 text-md md:px-10 md:py-4 lg:text-2xl ">Access Dashboard</Button>
      </Link>
    </div>
  );
}
