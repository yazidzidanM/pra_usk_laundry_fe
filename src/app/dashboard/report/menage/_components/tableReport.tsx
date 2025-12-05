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
import { Button } from "@/components/ui/button";

export type TDataTableProps = {
  data: any[];
  page: number;
  totalPage: number;
  prev: () => void;
  next: () => void;
}

export default function TableTransaksi({ data, page, totalPage, prev, next }: TDataTableProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Daftar Transaksi</CardTitle>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => prev()}
            disabled={page === 1}
          >
            Prev
          </Button>
          <Button variant="outline" className="cursor-default">
            <span className="text-sm">
              {page}/{totalPage}
            </span>
          </Button>

          <Button
            variant="outline"
            onClick={() => next()}
            disabled={page === totalPage}
          >
            Next
          </Button>
        </div>
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
                    variant="outline"
                    className={`${t.dibayar === "dibayar" ? "bg-green-500" : "bg-red-600"} text-white px-2 py-1 rounded-xl`}
                  >
                    {t?.dibayar?.replace('_', ' ')}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`
                    ${t.status === "baru" ? "bg-sky-600" : ""}
                    ${t.status === "proses" ? "bg-yellow-500" : ""}
                    ${t.status === "selesai" ? "bg-lime-600" : ""}
                    ${t.status === "diambil" ? "bg-teal-600" : ""}
                    text-white px-2 py-1 rounded-xl
                  `}
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
