import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IOrder } from "@/hooks/orders/useGetOrders";
import clsx from "clsx";

interface OrderCardProps {
  order: IOrder;
  onCancel: (id: number) => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, onCancel }) => {
  const statusColor = clsx(
    "px-3 py-1 text-xs font-semibold rounded-full w-fit",
    {
      "bg-gray-200 text-gray-700": order.status === "waiting",
      "bg-blue-200 text-blue-700": order.status === "diterima",
      "bg-red-200 text-red-700": order.status === "ditolak",
      "bg-yellow-200 text-yellow-700": order.status === "proses",
      "bg-green-200 text-green-700": order.status === "selesai",
    }
  );

  return (
    <Card className="w-full max-w-md mx-auto mb-6 shadow-sm hover:shadow-md transition" key={order.id}>
      <CardHeader className="flex flex-col gap-2">
        <div className={statusColor}>{order?.status?.toUpperCase()}</div>

        <div>
          <h2 className="text-lg font-semibold">Order #{order.id}</h2>
          <p className="text-sm text-muted-foreground">Pemilik: {order.nama}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        
        <div className="grid grid-cols-2 gap-y-2 text-sm">
          <p className="font-semibold">Jenis Kelamin</p>
          <p className="text-muted-foreground">{order.jenis_kelamin}</p>

          <p className="font-semibold">Alamat</p>
          <p className="text-muted-foreground">{order.alamat}</p>

          <p className="font-semibold">Telepon</p>
          <p className="text-muted-foreground">{order.tlp}</p>

          <p className="font-semibold">Outlet</p>
          <p className="text-muted-foreground">{order.id_outlet}</p>

          <p className="font-semibold">Paket</p>
          <p className="text-muted-foreground">
            {order.jenis} - {order.nama_paket}
          </p>

          <p className="font-semibold">Harga Satuan</p>
          <p className="text-muted-foreground">
            Rp {order?.harga?.toLocaleString()}
          </p>

          <p className="font-semibold">Kuantitas</p>
          <p className="text-muted-foreground">{order.qty}</p>

          <p className="font-semibold">Total Harga</p>
          <p className="font-bold">
            Rp {order?.harga_total?.toLocaleString()}
          </p>

          <p className="font-semibold">Keterangan</p>
          <p className="text-muted-foreground">{order.keterangan}</p>
        </div>

        {order.status === "waiting" && (
          <Button
            variant="destructive"
            className="w-full mt-2 cursor-pointer"
            onClick={() => onCancel(order.id)}
          >
            Batalkan Pesanan
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
