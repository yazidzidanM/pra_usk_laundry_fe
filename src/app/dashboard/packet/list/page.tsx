"use client";

import { TPaket, useGetPakets } from "@/hooks/packets/useGetPacket";
import { PaketCardList } from "./_components/ListPacketComponent";
import { useDeletePaket } from "@/hooks/packets/useDeletePacket";
import { toast } from "sonner";
import { useGetPaketById } from "@/hooks/packets/useGetPacketById";
import { useState } from "react";
import { useUpdatePaket } from "@/hooks/packets/useUpdatePacket";
import { EditPaketModal } from "./_components/EditPacketModal";

export default function PaketPage() {
  const [id, setId] = useState<number>();
  const [isOpen, setIsOpen] = useState(false);
  
  const { data: pakets, isPending } = useGetPakets();

  const { mutate: mutateDelete } = useDeletePaket({
    mutationConfig: {
      onError: () => toast.error("Gagal menghapus paket!"),
      onSuccess: () => toast.success("Paket berhasil dihapus"),
    }
  });

  const { data: selectedPaket } = useGetPaketById({
    id: id as number,
    queryConfig: { enabled: !!id }
  });

  const { mutate: updateMutate } = useUpdatePaket({
    id: id as number,
    mutationConfig: {
      onError: () => toast.error("Gagal mengupdate paket!"),
      onSuccess: () => toast.success("Paket berhasil diupdate"),
    }
  });

  return (
    <>
      <PaketCardList
        data={pakets ?? []}
        isLoading={isPending}
        onEdit={(paket) => {
          setId(paket.id);
          setIsOpen(true);
        }}
        onDelete={(id) => mutateDelete(id)}
      />

      <EditPaketModal
        open={isOpen}
        onOpenChange={setIsOpen}
        paket={selectedPaket ?? null}
        onSubmit={(values) => {
          setIsOpen(false),
          updateMutate({
            id: id!,       
            data: values,
          });
        }}
      />
    </>
  );
}
