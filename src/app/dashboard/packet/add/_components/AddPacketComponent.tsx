"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useGetOutlets } from "@/hooks/outlets/useGetOutlets";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { paketSchema, TPaketForm } from "@/validations/PacketValidation";
import { useCreatePaket } from "@/hooks/packets/useCreatePacket";
import { queryClient } from "@/providers/ReactQueryProvider";
import { getPaketsQueryKey } from "@/keys/packetKey";

export function AddPaketForm() {
  const { data: outlets = [] } = useGetOutlets();

  const form = useForm<TPaketForm>({
    resolver: zodResolver(paketSchema),
    defaultValues: {
      id_outlet: 0,
      jenis: "",
      nama_paket: "",
      harga: 0,
    },
  });

  const createPaketMutation = useCreatePaket({
    mutationConfig: {
      onSuccess: () => {
        form.reset();
        toast.success("Paket berhasil ditambahkan!");
        queryClient.invalidateQueries({ queryKey: getPaketsQueryKey() });
      },
      onError: (err: any) => {
        toast.error(err?.message || "Gagal menambah paket");
      },
    },
  });

  const onSubmit = (values: TPaketForm) => {
    createPaketMutation.mutate(values);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Tambah Paket Baru</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

          <div className="space-y-2">
            <Label>Pilih Outlet</Label>
            <Select
              value={form.watch("id_outlet") ? String(form.watch("id_outlet")) : ""}
              onValueChange={(v: any) => form.setValue("id_outlet", Number(v))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih Outlet" />
              </SelectTrigger>
              <SelectContent>
                {outlets.map((o: any) => (
                  <SelectItem key={o.id} value={String(o.id)}>
                    {o.nama_outlet} (ID: {o.id})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.id_outlet && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.id_outlet.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Jenis</Label>
            <Select
              value={form.watch("jenis") || ""}
              onValueChange={(v: any) => form.setValue("jenis", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih jenis paket" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kiloan">Kiloan</SelectItem>
                <SelectItem value="selimut">Selimut</SelectItem>
                <SelectItem value="bed cover">Bed Cover</SelectItem>
                <SelectItem value="kaos">Kaos</SelectItem>
                <SelectItem value="lain">Lain</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.jenis && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.jenis.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Nama Paket</Label>
            <Input
              {...form.register("nama_paket")}
              placeholder="Contoh: soft"
            />
            {form.formState.errors.nama_paket && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.nama_paket.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Harga</Label>
            <Input
              type="number"
              {...form.register("harga", { valueAsNumber: true })}
              placeholder="Contoh: 10000"
            />
            {form.formState.errors.harga && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.harga.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={createPaketMutation.isPending}
            className="w-full"
          >
            {createPaketMutation.isPending ? "Menyimpan..." : "Tambah Paket"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
