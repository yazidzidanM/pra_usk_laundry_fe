import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IMember } from "@/hooks/customer/useGetMemberById";

type MyOrderComponentProps = {
  user: any;
  onWaiting: any;
  onAccept: any;
  onProcess: any;
  done: any;
  dataMember: IMember | []
}
export default function MyOrderComponent({ user, onWaiting, onAccept, onProcess, done, dataMember }: MyOrderComponentProps) {
  const nama = user?.nama
  return (
    <div className="w-full min-h-screen p-6 flex flex-col gap-6 bg-background text-foreground">
      <Card className="relative overflow-hidden rounded-2xl shadow-sm bg-card border-none">
        <div className="absolute -top-25 -left-22 w-64 h-64 bg-teal-400/30 rounded-full blur-3xl pointer-events-none" />
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Hai, {nama} 👋</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground text-sm">
          Berikut adalah semua data mengenai pesanan kamu. Pantau status, lihat detail, dan kelola semuanya dengan mudah.
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <Card className="relative overflow-hidden p-5 rounded-2xl shadow-sm bg-card border-none flex flex-col gap-2">
          <div className="absolute -top-25 -left-25 w-64 h-64 bg-slate-500/40 rounded-full blur-3xl pointer-events-none" />
          <CardTitle className="text-lg font-medium">Menunggu</CardTitle>
          <p className="text-muted-foreground text-sm">Total anda pesanan yang menunggu konfirmasi.</p>
          <div className="text-3xl font-bold mt-2 text-slate-400">{onWaiting ? onWaiting : "0"}</div>
        </Card>

        <Card className="relative overflow-hidden p-5 rounded-2xl shadow-sm bg-card border-none flex flex-col gap-2">
          <div className="absolute -top-25 -left-25 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
          <CardTitle className="text-lg font-medium">Diterima</CardTitle>
          <p className="text-muted-foreground text-sm">Pesanan anda yang sudah diterima outlet.</p>
          <div className="text-3xl font-bold mt-2 text-cyan-400">{onAccept ? onAccept : "0"}</div>
        </Card>

        <Card className="relative overflow-hidden p-5 rounded-2xl shadow-sm bg-card border-none flex flex-col gap-2">
          <div className="absolute -top-25 -left-25 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
          <CardTitle className="text-lg font-medium">Proses</CardTitle>
          <p className="text-muted-foreground text-sm">Pesanan anda yang sedang dikerjakan.</p>
          <div className="text-3xl font-bold mt-2 text-amber-400">{onProcess ? onProcess : "0"}</div>
        </Card>

        <Card className="relative overflow-hidden p-5 rounded-2xl shadow-sm bg-card border-none flex flex-col gap-2">
          <div className="absolute -top-25 -left-25 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          <CardTitle className="text-lg font-medium">Selesai</CardTitle>
          <p className="text-muted-foreground text-sm">Pesanan anda yang sudah selesai.</p>
          <div className="text-3xl font-bold mt-2 text-emerald-400">{done ? done : "0"}</div>
        </Card>
      </div>

      <Card className="rounded-2xl shadow-sm bg-card border-none">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Data Member</CardTitle>
        </CardHeader>
        <CardContent className="text-sm flex flex-col gap-2 text-muted-foreground">
          {Array.isArray(dataMember) ? (
            <p>Anda Belum punya member, member akan otomatis dibuat ketika anda membuat pesanan</p>
          ) : (
            <>
              <p><strong>Nama:</strong> {dataMember.nama || "-"}</p>
              <p><strong>Alamat:</strong> {dataMember.alamat || "-"}</p>
              <p><strong>Jenis Kelamin:</strong> {dataMember.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan"}</p>
              <p><strong>No. Telepon:</strong> {dataMember.tlp || "-"}</p>
            </>
          )}
        </CardContent>
      </Card>

      <Card className="rounded-2xl shadow-sm bg-card border-none">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Riwayat Pesanan</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground text-sm">
          Kamu bisa melihat riwayat lengkap pesanan kamu di halaman khusus riwayat transaksi.
          <div className="mt-4">
            <Link href="/dashboard/my_order/history">
              <Button>Lihat Riwayat</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
