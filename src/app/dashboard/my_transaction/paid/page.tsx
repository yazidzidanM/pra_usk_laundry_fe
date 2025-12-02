"use client"

import { useAuthStore } from "@/menageState/zustandStore"
import Bill from "./_components/bill"


export default function BillPage() {
  const user = useAuthStore((s) => s.user)
  return (
    <div>
      <Bill user={user} />
    </div>
  )
}