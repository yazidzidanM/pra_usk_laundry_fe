"use client"

import { useEffect, useState } from "react";
import { OrderCard } from "./historyCard";
import { useGetCustomerOrderByIdUser } from "@/hooks/customer/useGetOrderUserId";
import { useDeleteCustomerOrder } from "@/hooks/customer/useCancelOrder";
import { CardSkeleton } from "@/layouts/organism/CardSkeleton";

export default function History({user}: any) {
  const id_user = user.id
  console.log(id_user)
  const [idDel, setIdDel] = useState<number>()

  const { data: orders, isLoading } = useGetCustomerOrderByIdUser({id: user.id as number});
  
  console.log(orders)
  const {mutate: mutateDelete} = useDeleteCustomerOrder({id: id_user as number})

  const handleCancel = (id: number) => {
    setIdDel(id)
    console.log(id)
    console.log(idDel)
    mutateDelete(id)
  };

  if(orders?.length === 0){
    return <div><p className="text-neutral-500">No data. make an order first</p></div>
  }
  
  return (
    <div className="p-4 grid grid-cols-3 lg:grid-cols-4 gap-8">
      {isLoading
        ? Array.from({ length: 8 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))
        : 
        orders?.map(order => (
          <OrderCard
            key={order.id}
            order={order ?? []}
            onCancel={handleCancel}
          />
        ))
      }
    </div>
  );
}
