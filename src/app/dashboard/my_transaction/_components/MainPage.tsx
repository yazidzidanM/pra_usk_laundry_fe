import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export type TransactionUserPageProps = {
  user: string;
  notPaid: any;
  hasPaid: any;
  notTaken: any;
  hasTaken: any;
  billing: any
}

export default function TransactionUserPage({user, notPaid, hasPaid, notTaken, hasTaken, billing}: TransactionUserPageProps) {
  return (
    <div className="max-w-full h-full p-6 flex flex-col gap-6 bg-background text-foreground">
      <Card className="relative overflow-hidden rounded-2xl shadow-sm bg-card border-none">
          <div className="absolute -top-25 -left-20 w-64 h-64 bg-teal-600/40 rounded-full blur-2xl pointer-events-none" />
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Halo, {user} 👋</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground text-sm">
          Berikut adalah rangkuman transaksi kamu. Kelola pembayaran, penjemputan, dan cek detail transaksi dengan lebih mudah.
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="relative overflow-hidden p-5 rounded-2xl shadow-sm bg-card border-none flex flex-col gap-2">
          <div className="absolute -top-25 -left-25 w-64 h-64 bg-green-500/40 rounded-full blur-3xl pointer-events-none" />
          <CardTitle className="text-lg font-medium">Sudah Dibayar</CardTitle>
          <p className="text-muted-foreground text-sm">Total transaksi yang telah dibayar.</p>
          <div className="text-3xl font-bold mt-2 text-green-400">{hasPaid ?? 0}</div>
        </Card>

        <Card className="relative overflow-hidden p-5 rounded-2xl shadow-sm bg-card border-none flex flex-col gap-2">
          <div className="absolute -top-25 -left-25 w-64 h-64 bg-red-500/40 rounded-full blur-3xl pointer-events-none" />
          <CardTitle className="text-lg font-medium">Belum Dibayar</CardTitle>
          <p className="text-muted-foreground text-sm">Transaksi yang masih menunggu pembayaran.</p>
          <div className="text-3xl font-bold mt-2 text-red-400">{notPaid ?? 0}</div>
        </Card>

        <Card className="relative overflow-hidden p-5 rounded-2xl shadow-sm bg-card border-none flex flex-col gap-2">
          <div className="absolute -top-25 -left-25 w-64 h-64 bg-cyan-500/40 rounded-full blur-3xl pointer-events-none" />
          <CardTitle className="text-lg font-medium">Sudah Diambil</CardTitle>
          <p className="text-muted-foreground text-sm">Laundry anda yang sudah diambil.</p>
          <div className="text-3xl font-bold mt-2 text-cyan-400">{hasTaken ?? 0}</div>
        </Card>

        <Card className="relative overflow-hidden p-5 rounded-2xl shadow-sm bg-card border-none flex flex-col gap-2">
          <div className="absolute -top-25 -left-25 w-64 h-64 bg-blue-600/40 rounded-full blur-3xl pointer-events-none" />
          <CardTitle className="text-lg font-medium">Belum Diambil</CardTitle>
          <p className="text-muted-foreground text-sm">Laundry anda yang masih di outlet.</p>
          <div className="text-3xl font-bold mt-2 text-blue-500">{notTaken ?? 0}</div>
        </Card>
      </div>

      <Card className="p-5 rounded-2xl shadow-sm bg-card border-none flex flex-col gap-2">
        <CardTitle className="text-lg font-medium">Tagihan Belum Dibayar</CardTitle>
        <p className="text-muted-foreground text-sm">Total nominal tagihan yang belum diselesaikan.</p>
        <div className="text-3xl font-bold mt-2">Rp {billing ?? 0}</div>
      </Card>
    </div>
  );
}
