"use client"

import { useState } from "react";
import { useGetOrders } from "@/hooks/orders/useGetOrders";
import { useUpdateOrder } from "@/hooks/orders/useUpdateOrder";
import { toast } from "sonner";
import { OrderCard } from "./processingCard";
import { CardSkeleton } from "@/layouts/organism/CardSkeleton";

export default function Processing() {
  const [id, setId] = useState<number>()
  const { data: orders, isLoading } = useGetOrders();
  const { mutate: updateMutate, error } = useUpdateOrder({
    id: id as number,
    mutationConfig: {
      onError: () => toast.error("Gagal mengupdate order!"),
      onSuccess: () => toast.success("Order berhasil diupdate"),
    }
  });
  const filtered = orders?.filter(item => item.status !== "waiting" && item.status !== "ditolak");

  const handleProcess = (id: number) => {
    setId(id)
    updateMutate({
      id: id!,
      status: "proses"
    })
  };

  const handleDone = (id: number) => {
    setId(id)
    updateMutate({
      id: id!,
      status: "selesai"
    })
  };

  console.log(isLoading)

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {isLoading
        ? Array.from({ length: 8 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))
        : filtered?.map(order => (
            <OrderCard
              key={order.id}
              order={order}
              onProcess={handleProcess}
              onDone={handleDone}
            />
          ))
      }
    </div>
  );
}
