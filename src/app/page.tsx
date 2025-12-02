"use server"

import { Button } from "@/components/ui/button";
import { getUserFromCookie } from "@/stores/auth-store";
import Link from "next/link"
import { redirect } from "next/navigation";
export default async function Home() {
  const user = await getUserFromCookie()
  // if(!user){
  //   redirect("/login")
  // }
  console.log(user)
  return (
    <div className="bg-muted flex flex-col items-center justify-center h-screen space-y-4">
    <a className="text-4xl font-semibold">Welcome To Laundry {user?.nama}</a>
      <Link href="/dashboard">
        <Button className="flex w-full justify-center items-center bg-teal-500 text-white px-8 py-2 text-xl ">Access Dashboard</Button>
      </Link>
    </div>
  );
}
