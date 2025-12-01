import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  ClipboardList,
  Store,
  User,
  Wallet,
} from "lucide-react";

interface IUserTrx {
  id: number;
  id_outlet: number;
  kode_invoice: string;
  id_member: number;
  tgl: string;
  batas_waktu: string | null;
  tgl_bayar: string | null;
  biaya_tambahan: number;
  diskon: number;
  pajak: number;
  status: string;
  dibayar: string;
  id_user: number;
  id_pesanan: number;
}

export function UserTransactionCard({ trx }: { trx: IUserTrx }) {
  const statusColor: Record<string, string> = {
    baru: "bg-gray-600",
    proses: "bg-yellow-600",
    selesai: "bg-blue-600",
    diambil: "bg-green-600",
  };

  return (
    <Card className="border border-neutral-700 bg-neutral-900 text-white shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          {trx.kode_invoice}
        </CardTitle>

        <div className="flex gap-2 mt-2">
          <Badge className={statusColor[trx.status]}>
            {trx.status.toUpperCase()}
          </Badge>

          <Badge
            className={
              trx.dibayar === "dibayar"
                ? "bg-green-600"
                : "bg-red-600"
            }
          >
            {trx?.dibayar?.replace('_', ' ').toUpperCase()}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 text-sm">

        <div className="flex items-center gap-2 text-neutral-400">
          <CalendarDays size={16} className="text-neutral-300" />
          <span>
            Tanggal:{" "}
            <span className="text-white">
              {new Date(trx.tgl).toLocaleDateString("id-ID")}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2 text-neutral-400">
          <Store size={16} className="text-neutral-300" />
          <span>
            ID Outlet: <span className="text-white">{trx.id_outlet}</span>
          </span>
        </div>

        <div className="flex items-center gap-2 text-neutral-400">
          <User size={16} className="text-neutral-300" />
          <span>
            ID Member: <span className="text-white">{trx.id_member}</span>
          </span>
        </div>

        <div className="flex items-center gap-2 text-neutral-400">
          <ClipboardList size={16} className="text-neutral-300" />
          <span>
            ID Pesanan: <span className="text-white">{trx.id_pesanan}</span>
          </span>
        </div>

        <div className="flex items-center gap-2 text-neutral-400">
          <Wallet size={16} className="text-neutral-300" />
          <span>
            Pajak: <span className="text-white">{trx.pajak}</span>
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
