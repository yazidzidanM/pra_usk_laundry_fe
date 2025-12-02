"use client"

import { useAuthStore } from "@/menageState/zustandStore"
import HistoryTrxUser from "./_components/history"


export default function BillPage() {
  const user = useAuthStore((s) => s.user)
  return (
    <div>
      <HistoryTrxUser user={user} />
    </div>
  )
}