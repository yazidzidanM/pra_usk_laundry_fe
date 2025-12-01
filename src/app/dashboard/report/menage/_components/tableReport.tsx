import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function TableTransaksi({ data }: { data: any[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar Transaksi</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Pelanggan</TableHead>
              <TableHead>Tgl Transaksi</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Dibayar</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((t) => (
              <TableRow key={t.kode_invoice}>
                <TableCell>{t.kode_invoice}</TableCell>
                <TableCell>{t.nama_pelanggan ?? "-"}</TableCell>
                <TableCell>{t.tgl_transaksi.split("T")[0]}</TableCell>
                <TableCell>Rp {t.total?.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      t.dibayar === "dibayar" ? "bg-green-600" : "bg-red-600"
                    }
                  >
                    {t.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      t.status === "baru" ? "bg-blue-500" :
                        t.status === "proses" ? "bg-yellow-500" :
                          t.status === "selesai" ? "bg-green-600" :
                            "bg-teal-600"
                    }
                  >
                    {t.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
