"use client"

import { useGetCustomerBillByIdUser } from "@/hooks/customer/useGetBillUser"
import { toast } from "sonner"
import { BillCard } from "./billCard"
import { useDoPayment } from "@/hooks/customer/usePayment"
import { BillCardSkeleton } from "@/layouts/organism/billCardSKeleton"

export default function Bill({ user }: any) {
  const id_user = user?.id
  const { data, isLoading } = useGetCustomerBillByIdUser({ id: id_user, queryConfig: { enabled: !!id_user } });
  const {mutateAsync: payment } = useDoPayment({id: id_user as number})

  const handlePay = async (kode_invoice: string) => {
    console.log(kode_invoice)
  const res = await payment(kode_invoice);
  window.open(res.url, "_blank");
}; 

  if(data?.length === 0){
    return <div><p className="text-neutral-500">No data. make an order first</p></div>
  }

  console.log(id_user)
  console.log(data)

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      {isLoading &&
        Array.from({ length: 6 }).map((_, i) => (
          <BillCardSkeleton key={i} />
        ))
      }

      {!isLoading && data?.map((bill: any) => (
        <BillCard
          key={bill.id}
          bill={bill}
          onPay={() => handlePay(bill.kode_invoice)}
        />
      ))}
    </div>
  )
}
