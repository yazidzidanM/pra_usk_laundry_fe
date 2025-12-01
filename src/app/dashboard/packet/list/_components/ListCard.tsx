import { TPaket } from "@/hooks/packets/useGetPacket";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function PaketCard({
  paket,
  onEdit,
  onDelete,
}: {
  paket: TPaket;
  onEdit: (paket: TPaket) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <Card className="
      overflow-hidden 
      rounded-xl 
      shadow-md 
      hover:shadow-lg 
      transition 
      border border-gray-200
    ">
      
      <div
        className="
          p-4 
          bg-gradient-to-r 
          from-blue-500 
          to-indigo-500 
          text-white
        "
      >
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{paket.nama_paket}</h2>

          <span className="px-3 py-1 text-xs font-bold rounded-full bg-white/25">
            {paket.jenis.toUpperCase()}
          </span>
        </div>

        <p className="text-2xl font-bold mt-2">
          Rp {paket.harga.toLocaleString()}
        </p>
      </div>

      <CardContent className="p-4">

        <div className="space-y-1 text-sm">
          <p className="text-gray-600">
            <strong className="text-gray-800">Outlet:</strong> {paket.id_outlet}
          </p>
          <p className="text-gray-600">
            <strong className="text-gray-800">ID Paket:</strong> {paket.id}
          </p>
        </div>

        <div className="flex justify-between mt-4">

          <Button
            size="sm"
            className="
              bg-gradient-to-r from-amber-400 to-orange-500 
              text-white 
              hover:opacity-90
            "
            onClick={() => onEdit(paket)}
          >
            Edit
          </Button>

          <Button
            size="sm"
            className="
              bg-gradient-to-r from-red-500 to-pink-500 
              text-white 
              hover:opacity-90
            "
            onClick={() => onDelete(paket.id!)}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
