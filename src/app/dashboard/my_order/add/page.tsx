"use client"

import { useAuthStore } from "@/menageState/zustandStore";
import { AddOrderForm } from "./_components/addOrderForm";

export default function AddOrder() {
  const user = useAuthStore((s) => s.user)
  return (
    <div className="w-full h-full flex ">
      <AddOrderForm user={user}/>
    </div>
  )
}