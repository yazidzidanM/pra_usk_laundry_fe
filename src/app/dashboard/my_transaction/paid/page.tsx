import { getUserFromCookie } from "@/stores/auth-store"
import Bill from "./_components/bill"


export default async function BillPage() {
  const user = await getUserFromCookie()
  return (
    <div>
      <Bill user={user} />
    </div>
  )
}