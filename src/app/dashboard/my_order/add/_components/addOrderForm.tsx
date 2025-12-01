"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useGetOutlets } from "@/hooks/outlets/useGetOutlets";
import { useGetPakets } from "@/hooks/packets/useGetPacket";

import { toast } from "sonner";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

import { useEffect, useMemo } from "react";
import { pesananSchema, TPesananForm } from "@/validations/OrderValidation";
import { useCreateOrder } from "@/hooks/customer/useCreateOrder";

export function AddOrderForm({user}: any) {
  const id_user = user.id
  const { data: outlets = [] } = useGetOutlets();
  const { data: pakets = [] } = useGetPakets();

  const form = useForm<TPesananForm>({
    resolver: zodResolver(pesananSchema),
    defaultValues: {
      nama: "",
      jenis_kelamin: "",
      alamat: "",
      tlp: "",
      id_outlet: 0,
      id_paket: 0,
      jenis: "",
      nama_paket: "",
      qty: 1,
      harga: 0,
      harga_total: 0,
      keterangan: "",
    },
  });

  const filteredPakets = useMemo(() => {
    return pakets.filter((p: any) => p.id_outlet === form.watch("id_outlet"));
  }, [pakets, form.watch("id_outlet")]);

  useEffect(() => {
    const selected = filteredPakets.find(
      (p: any) => p.id === form.watch("id_paket")
    );

    if (selected) {
      form.setValue("harga", selected.harga);
      form.setValue("jenis", selected.jenis)
      form.setValue("nama_paket", selected.nama_paket)
      form.setValue("harga", selected.harga)
    }

  }, [form.watch("id_paket")]);

  useEffect(() => {
    const harga = form.watch("harga") ?? 0;
    const qty = form.watch("qty") ?? 0;
    form.setValue("harga_total", harga * qty);
  }, [form.watch("harga"), form.watch("qty")]);

  const createPesanan = useCreateOrder({id: id_user as number});

  const submitForm = (values: TPesananForm) => {
    const payload = {id_user, ...values}
    console.log(payload)
    createPesanan.mutate(payload);
    form.reset()
  };

  console.log(createPesanan.error)

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Buat Pesanan Baru</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(submitForm)} className="space-y-5">

          <div className="space-y-2">
            <Label>Nama</Label>
            <Input {...form.register("nama")} placeholder="Masukkan Nama..."/>
          </div>

          <div className="space-y-2">
            <Label>Jenis Kelamin</Label>
            <Select
              value={form.watch("jenis_kelamin")}
              onValueChange={(v) => form.setValue("jenis_kelamin", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih jenis kelamin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="L">Laki-laki</SelectItem>
                <SelectItem value="P">Perempuan</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Alamat</Label>
            <Input {...form.register("alamat")} placeholder="Masukkan alamat anda"/>
          </div>

          <div className="space-y-2">
            <Label>No Telepon</Label>
            <Input {...form.register("tlp")} placeholder="Contoh: 08..." />
          </div>

          <div className="space-y-2">
            <Label>Pilih Outlet</Label>
            <Select
              value={String(form.watch("id_outlet"))}
              onValueChange={(v) => {
                form.setValue("id_outlet", Number(v));
                form.setValue("id_paket", 0);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih Outlet" />
              </SelectTrigger>
              <SelectContent>
                {outlets.map((o: any) => (
                  <SelectItem key={o.id} value={String(o.id)}>
                    {o.nama} - {o.kota}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Pilih Paket</Label>
            <Select
              value={String(form.watch("id_paket"))}
              onValueChange={(v) => form.setValue("id_paket", Number(v))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih Paket" />
              </SelectTrigger>
              <SelectContent>
                {filteredPakets.length === 0 && (
                  <p className="px-3 py-2 text-sm text-muted-foreground">
                    Pilih outlet terlebih dahulu
                  </p>
                )}
                {filteredPakets.map((p: any) => (
                  <SelectItem key={p.id} value={String(p.id)}>
                    {p.jenis} - {p.nama_paket} - Rp {p.harga.toLocaleString()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>jenis (Otomatis)</Label>
            <Input value={form.watch("jenis")} placeholder="Otomatis..." disabled />
          </div>
          <div className="space-y-2">
            <Label>nama paket (Otomatis)</Label>
            <Input value={form.watch("nama_paket")} placeholder="Otomatis..." disabled />
          </div>
          <div className="space-y-2">
            <Label>Harga Dasar (Otomatis)</Label>
            <Input value={form.watch("harga")} placeholder="Otomatis..." disabled />
          </div>

          <div className="space-y-2">
            <Label>Quantity</Label>
            <Input
              type="number"
              {...form.register("qty", { valueAsNumber: true })}
              placeholder="Contoh: 2..."
            />
          </div>

          <div className="space-y-2">
            <Label>Total Harga (Otomatis)</Label>
            <Input value={form.watch("harga_total")} placeholder="Otomatis..." disabled />
          </div>

          <div className="space-y-2">
            <Label>Keterangan</Label>
            <Input {...form.register("keterangan")} placeholder="Contoh: baju putih pisahkan..."/>
          </div>

          <Button type="submit" className="w-full">
            Buat Pesanan
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
