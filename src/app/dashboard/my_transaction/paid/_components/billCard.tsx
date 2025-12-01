import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CircleCheckBig } from "lucide-react"

interface IBill {
  id?: number
  dibayar: string
  kode_invoice: string
  nama: string
  harga_total: number
  tlp: string
}

export function BillCard({ bill, onPay }: { bill: IBill, onPay: () => void }) {
  console.log(bill?.kode_invoice)
  return (
    <Card className="w-full max-w-md mx-auto mb-4 border border-neutral-700 bg-neutral-900 shadow-md" key={bill.id}>
      
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-white">
          Invoice
        </CardTitle>

        <p className="text-sm text-teal-400 font-medium tracking-wide">
          {bill.kode_invoice}
        </p>
      </CardHeader>

      <CardContent className="space-y-3 text-sm">
        <div>
          <p className="text-neutral-400">Nama Pelanggan</p>
          <p className="font-medium text-white">{bill.nama}</p>
        </div>

        <div>
          <p className="text-neutral-400">No. Telepon</p>
          <p className="font-medium text-white">{bill.tlp}</p>
        </div>

        <div>
          <p className="text-neutral-400">Total Pembayaran</p>
          <p className="text-green-400 font-semibold text-lg">
            Rp {bill.harga_total.toLocaleString()}
          </p>
        </div>
        
        {bill.dibayar !== "dibayar" ? 
        <Button 
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold"
          onClick={onPay}
        >
          Bayar Sekarang
        </Button>
        :
        <Button 
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
          onClick={onPay}
          disabled
        >
          <CircleCheckBig /> Sudah Dibayar
        </Button>
        }
      </CardContent>
    </Card>
  )
}
