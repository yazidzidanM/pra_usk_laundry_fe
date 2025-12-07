import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EllipsisVertical } from "lucide-react";

export default function UserDashboard({ user }: any) {
  const nama = user?.nama
  return (
    <div className="w-full min-h-screen p-6 flex flex-col gap-6 bg-background text-foreground">
      <Card className="rounded-2xl shadow-sm border-none bg-card">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Selamat datang, {nama} 👋</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground text-sm">
          Semoga harimu menyenangkan! Kelola kebutuhan laundry kamu dengan mudah di dashboard ini.
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 rounded-2xl shadow-sm bg-card border-none flex flex-col items-start gap-2">
          <CardTitle className="text-lg font-medium">Order Laundry</CardTitle>
          <p className="text-sm text-muted-foreground">Buat pesanan laundry baru dengan cepat.</p>
          <Link href="/dashboard/my_order/add" className="mt-auto w-full">
            <Button className="mt-auto w-full cursor-pointer">Buat Order</Button>
          </Link>
        </Card>

        <Card className="p-4 rounded-2xl shadow-sm bg-card border-none flex flex-col items-start gap-2">
          <CardTitle className="text-lg font-medium">Proses Pesanan</CardTitle>
          <p className="text-sm text-muted-foreground">Lihat status laundry kamu saat ini.</p>
          <Link href="/dashboard/my_order/history" className="mt-auto w-full">
            <Button className="mt-auto w-full cursor-pointer">Cek Status</Button>
          </Link>
        </Card>

        <Card className="p-4 rounded-2xl shadow-sm bg-card border-none flex flex-col items-start gap-2">
          <CardTitle className="text-lg font-medium">History Transaksi</CardTitle>
          <p className="text-sm text-muted-foreground">Riwayat pesanan dan pembayaran sebelumnya.</p>
          <Link href="/dashboard/my_transaction/history" className="mt-auto w-full cursor-pointer">
            <Button className="mt-auto w-full cursor-pointer">Lihat Riwayat</Button>
          </Link>
        </Card>
      </div>

      <Card className="rounded-2xl shadow-sm bg-card border-none">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Panduan Penggunaan Website</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>1. Cara Membuat Order Laundry</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>
                  Klik tombol <strong>Buat Order</strong>, lalu isi detail laundry seperti nama, alamat, no telfon, toko dan jenis paket yang tersedia, lalu Buat Pesanan.
                </p>
                Atau
                <p>
                  Pergi ke menu <strong>My Order &gt; Make an Order</strong> pada sidebar disebelah kiri, lalu isi detail laundry seperti nama, alamat, no telfon, toko dan jenis paket yang tersedia, lalu Buat Pesanan.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>2. Cara Melihat Proses Pesanan</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>
                  Klik tombol <strong>Cek Status</strong>, disana ada detail pesanan, lalu ada tahap pengerjaan seperti "Waiting (Menunggu)", "Diterima", "Proses", hingga "Selesai".
                </p>
                Atau
                <p>
                  Pergi ke menu <strong>My Order &gt; History Order</strong>, disana ada detail pesanan, lalu ada tahap pengerjaan seperti "Waiting (Menunggu)", "Diterima", "Proses", hingga "Selesai".
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>3. Cara Melakukan Pembayaran</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>
                  Jika pesanan sudah dibuat, kamu bisa membayar melalui halaman <strong>My Transaction &gt; BIll</strong>.
                </p>
                Atau
                <p className="flex">
                  Jika pesanan sudah dibuat, kamu bisa membayar klik <strong><EllipsisVertical className="size-4 mt-[2px]" /></strong> di kiri bawah sidebar dan menuju menu<strong>&#160;My Transaction &gt; BIlling </strong>.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>4. Melihat History Transaksi</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>
                  Klik tombol <strong>Lihat Riwayat</strong>, disana ada detail transaksi, dibayar atau belum, status yang memiliki beberapa tahap yaitu: Baru, Proses, Selesai, dan anda juga bisa klik tombol Sudah Diambil untuk tanda bahwa telah mengambil laundry
                </p>
                Atau
                <p>
                  Pergi ke menu <strong>My Transaction &gt; History Transaction</strong>, disana ada detail transaksi, dibayar atau belum, status yang memiliki beberapa tahap yaitu: Baru, Proses, Selesai, dan anda juga bisa klik tombol Sudah Diambil untuk tanda bahwa telah mengambil laundry
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
