import { getUserFromCookie } from "@/stores/auth-store"
import HistoryTrxUser from "./_components/history"


export default async function BillPage() {
  const user = await getUserFromCookie()
  return (
    <div>
      <HistoryTrxUser user={user} />
    </div>
  )
}