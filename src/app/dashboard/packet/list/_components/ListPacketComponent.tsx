import { useState, useMemo } from "react";
import { TPaket } from "@/hooks/packets/useGetPacket";
import { PaketCard } from "./ListCard";
import { Input } from "@/components/ui/input";
import { PaketCardSkeletonList } from "@/layouts/organism/ListPacketCardSkeleton";

export function PaketCardList({
  data,
  isLoading,
  onEdit,
  onDelete,
}: {
  data: TPaket[];
  isLoading: boolean;
  onEdit: (paket: TPaket) => void;
  onDelete: (id: number) => void;
}) {
  
  const [search, setSearch] = useState("");

  if (isLoading) return <PaketCardSkeletonList />;

  const filteredData = useMemo(() => {
    const keyword = search.toLowerCase();

    return data.filter((item) => {
      const matchNamaPaket = item.nama_paket.toLowerCase().includes(keyword);
      const matchJenis = item.jenis.toLowerCase().includes(keyword);
      const matchOutlet = item.id_outlet === Number(keyword);

      return matchNamaPaket || matchJenis || matchOutlet;
    });
  }, [data, search]);

  return (
    <div className="space-y-4">

      <Input
        placeholder="Cari paket (nama, jenis, atau id outlet)..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-1/2"
      />

      {filteredData.length === 0 ? (
        <p className="text-sm text-muted-foreground">Tidak ada data ditemukan.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredData.map((item) => (
            <PaketCard
              key={item.id}
              paket={item}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
