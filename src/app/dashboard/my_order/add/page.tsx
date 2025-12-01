"use server"

import { getUserFromCookie } from "@/stores/auth-store";
import { AddOrderForm } from "./_components/addOrderForm";

export default async function AddOrder() {
  const user = await getUserFromCookie()
  return (
    <div className="w-full h-full flex ">
      <AddOrderForm user={user}/>
    </div>
  )
}