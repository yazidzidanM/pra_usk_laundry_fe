import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { TStatus, TTrx } from "@/hooks/trx/useGetAllTrx";

type AdminTransactionTableProps = {
  data: TTrx[];
};

const statusColor: Record<TStatus, string> = {
  baru: "bg-gray-500",
  proses: "bg-yellow-500",
  selesai: "bg-blue-500",
  diambil: "bg-green-600",
};

export const AdminTransactionTable = ({ data }: AdminTransactionTableProps) => {
  return (
    <Card className="p-4 shadow-sm max-w-full">
      <div className="overflow-auto max-h-[500px] border rounded-md">
        <table className="w-full text-sm min-w-[1300px]">
          <thead className="bg-muted sticky top-0 z-10 shadow-sm">
            <tr>
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Invoice</th>
              <th className="p-2 text-left">User</th>
              <th className="p-2 text-left">Member</th>
              <th className="p-2 text-left">Outlet</th>
              <th className="p-2 text-left">Pesanan</th>
              <th className="p-2 text-left">Tanggal</th>
              <th className="p-2 text-left">Batas Waktu</th>
              <th className="p-2 text-left">Tanggal Bayar</th>
              <th className="p-2 text-left">Tambahan</th>
              <th className="p-2 text-left">Diskon</th>
              <th className="p-2 text-left">Pajak</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Dibayar</th>
            </tr>
          </thead>

          <tbody>
            {data.map((trx) => (
              <tr key={trx.id} className="border-b hover:bg-muted/30">
                <td className="p-2">{trx.id}</td>
                <td className="p-2 font-semibold">{trx.kode_invoice}</td>
                <td className="p-2">{trx.id_user}</td>
                <td className="p-2">{trx.id_member}</td>
                <td className="p-2">{trx.id_outlet}</td>
                <td className="p-2">{trx.id_pesanan}</td>

                <td className="p-2">
                  {trx.tgl ? new Date(trx.tgl).toLocaleDateString("id-ID") : "-"}
                </td>

                <td className="p-2">
                  {trx.batas_waktu
                    ? new Date(trx.batas_waktu).toLocaleDateString("id-ID")
                    : "-"}
                </td>

                <td className="p-2">
                  {trx.tgl_bayar
                    ? new Date(trx.tgl_bayar).toLocaleDateString("id-ID")
                    : "-"}
                </td>

                <td className="p-2">{trx.biaya_tambahan}</td>
                <td className="p-2">{trx.diskon}</td>
                <td className="p-2">{trx.pajak}</td>

                <td className="p-2">
                  <Badge
                    variant="outline"
                    className={statusColor[trx.status as TStatus]}
                  >
                    {trx.status}
                  </Badge>
                </td>

                <td className="p-2">
                  <Badge
                    className={
                      trx.dibayar === "dibayar"
                        ? "bg-green-600 text-white"
                        : "bg-red-600 text-white"
                    }
                  >
                    {trx?.dibayar?.replace('_', ' ')}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
