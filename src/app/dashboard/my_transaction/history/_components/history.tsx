"use client"

import { useGetTrxUser } from "@/hooks/customer/useGetTrxUser";
import { UserTransactionCard } from "./cardTrx";
import { UserTransactionSkeleton } from "@/layouts/organism/cardTrxSkeleton";
import { takeCustomerOrder } from "@/hooks/customer/useTakeLaundry";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { queryClient } from "@/providers/ReactQueryProvider";
import { getTrxQueryKey } from "@/keys/trxKey";
import { toast } from "sonner";

export default function HistoryTrxUser({ user }: any) {
  const [selectId, setSelectId] = useState<number>(0)
  const idUser = user?.id;

  const { data, isLoading } = useGetTrxUser({
    id_user: idUser,
    queryConfig: { enabled: !!idUser },
  });

  // const { mutate: mutateTake, error } = usetakeCustomerOrder({
  //   id: idUser as number, 
  // });

  const {mutate} = useMutation({
    mutationFn: takeCustomerOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: getTrxQueryKey(idUser)});
      toast.success("pengambilan anda sudah di tandai")
    },
    onError: (error) => {
      console.error(error);
    },
  })

  const handleTake = async (id_pesanan: number) => {
    console.log(id_pesanan)
    setSelectId(id_pesanan)
    mutate(id_pesanan)
    // const res = await takeCustomerOrder(id_pesanan)
    // console.log(res)
    // mutateTake(id_pesanan);
  };

  // console.log(error)

  if (isLoading) {
    return (
      <div className="p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <UserTransactionSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!isLoading && data?.length === 0) {
    return (
      <div>
        <p className="text-neutral-500">No data. Make an order first.</p>
      </div>
    );
  }

  return (
    <div className="p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data?.map((trx: any) => (
        <UserTransactionCard
          key={trx.id}
          trx={trx}
          handleTake={handleTake}
        />
      ))}
    </div>
  );
}
