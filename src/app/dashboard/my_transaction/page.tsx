"use client"

import { useGetCustomerDetailByIdUser } from "@/hooks/customer/useGetDetail"
import TransactionCarousel from "./_components/Carausel"
import TransactionUserPage from "./_components/MainPage"
import { useGetTrxUser } from "@/hooks/customer/useGetTrxUser"
import { useAuthStore } from "@/menageState/zustandStore"
import { AnimatedCounter } from "@/animations/animate"
import { useGetCustomerBillByIdUser } from "@/hooks/customer/useGetBillUser"

export default function Page(){
  const user = useAuthStore((u) => u.user)
  const id_user = user?.id
  const { data: bills} = useGetCustomerBillByIdUser({ id: id_user!, queryConfig: { enabled: !!id_user } });
  const { data: transactions } = useGetTrxUser({ id_user: id_user!, queryConfig: { enabled: !!id_user } });
  const { data: details } = useGetCustomerDetailByIdUser({ id_user: id_user!, queryConfig: { enabled: !!id_user } });
  console.log(details)

  return (
    <div className="w-full min-h-screen">
      
      <TransactionUserPage
      user={user?.nama ?? "guest"}
      notPaid={<AnimatedCounter  target={transactions?.filter((i) => i.dibayar === "belum_dibayar").length ?? 0} duration={1000}/>}
      hasPaid={<AnimatedCounter  target={transactions?.filter((i) => i.dibayar === "dibayar").length ?? 0} duration={1000}/>}
      notTaken={<AnimatedCounter target={transactions?.filter((i) => i.status === "selesai").length ?? 0} duration={1000}/>}
      hasTaken={<AnimatedCounter target={transactions?.filter((i) => i.status === "diambil").length ?? 0} duration={1000}/>}
      billing={<AnimatedCounter  target={bills?.filter((i) => i.dibayar !== "dibayar").reduce((a, b) => a + b.harga_total, 0)?? 0} duration={1000}/>}
      />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 w-full">
        <div className="lg:col-span-4 px-4">
          <TransactionCarousel data={details ?? []} />
        </div>
      </div>
    </div>
  )
}