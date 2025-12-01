"use client"

import { useEffect, useState } from "react";
import { OrderCard } from "./orderCard";
import { IOrder, useGetOrders } from "@/hooks/orders/useGetOrders";
import { useUpdateOrder } from "@/hooks/orders/useUpdateOrder";
import { toast } from "sonner";
import { CardSkeleton } from "@/layouts/organism/CardSkeleton";

export default function Orders() {
  const [id, setId] = useState<number>()
  const { data: orders, isLoading } = useGetOrders();
  const { mutate: updateMutate, error } = useUpdateOrder({
    id: id as number,
    mutationConfig: {
      onError: () => toast.error("Gagal mengupdate order!"),
      onSuccess: () => toast.success("Order berhasil diupdate"),
    }
  });
  console.log(error)

  const filterWaiting = orders?.filter(item => item.status === "waiting");

  const handleAccept = (id: number) => {
    setId(id)
    updateMutate({
      id: id!,
      status: "diterima"
    })
  };

  const handleReject = (id: number) => {
    setId(id)
    updateMutate({
      id: id!,
      status: "ditolak"
    })
  };

  return (
    <div className="p-4 grid grid-cols-4 gap-8">
      {isLoading
        ? Array.from({ length: 8 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))
        : filterWaiting?.map(order => (
            <OrderCard
              key={order.id}
              order={order}
              onAccept={handleAccept}
              onReject={handleReject}
            />
          ))
      }
    </div>
  );
}
