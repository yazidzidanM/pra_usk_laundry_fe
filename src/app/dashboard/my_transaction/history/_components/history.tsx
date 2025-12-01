"use client"

import { useGetTrxUser } from "@/hooks/customer/useGetTrxUser";
import { UserTransactionCard } from "./cardTrx";
import { UserTransactionSkeleton } from "@/layouts/organism/cardTrxSkeleton";


export default function HistoryTrxUser({ user }: any) {
  const { data, isLoading } = useGetTrxUser({ id_user: user.id });

  if(data?.length === 0){
    return <div><p className="text-neutral-500">No data. make an order first</p></div>
  }

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {isLoading &&
        Array.from({ length: 6 }).map((_, i) => <UserTransactionSkeleton key={i} />)}

      {!isLoading &&
        data?.map((trx: any) => (
          <UserTransactionCard key={trx.id} trx={trx} />
        ))}
    </div>
  );
}
