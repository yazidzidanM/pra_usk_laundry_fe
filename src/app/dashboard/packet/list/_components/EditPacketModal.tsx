"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { paketSchema, TPaketForm } from "@/validations/PacketValidation";
import { useGetOutlets } from "@/hooks/outlets/useGetOutlets";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { TPaket } from "@/hooks/packets/useGetPacket";
import { useEffect } from "react";

export function EditPaketModal({
  open,
  onOpenChange,
  paket,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  paket: TPaket | null;
  onSubmit: (values: TPaketForm) => void;
}) {
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

  useEffect(() => {
  if (open && paket) {
    form.reset({
      id_outlet: paket.id_outlet,
      jenis: paket.jenis,
      nama_paket: paket.nama_paket,
      harga: paket.harga,
    });
  }
}, [open, paket]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Paket</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          
          <div className="space-y-2">
            <Label>Pilih Outlet</Label>
            <Select
              value={String(form.watch("id_outlet"))}
              onValueChange={(v) => form.setValue("id_outlet", Number(v))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih Outlet" />
              </SelectTrigger>
              <SelectContent>
                {outlets.map((o: any) => (
                  <SelectItem key={o.id} value={String(o.id)}>
                    {o.id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Jenis</Label>
            <Select
              value={form.watch("jenis")}
              onValueChange={(v) => form.setValue("jenis", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih jenis paket" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kiloan">Kiloan</SelectItem>
                <SelectItem value="selimut">Selimut</SelectItem>
                <SelectItem value="bedcover">Bed Cover</SelectItem>
                <SelectItem value="kaos">Kaos</SelectItem>
                <SelectItem value="lain">Lain</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Nama Paket</Label>
            <Input {...form.register("nama_paket")} />
          </div>

          <div className="space-y-2">
            <Label>Harga</Label>
            <Input
              type="number"
              {...form.register("harga", { valueAsNumber: true })}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Batal
            </Button>
            <Button type="submit">Simpan Perubahan</Button>
          </div>

        </form>

      </DialogContent>
    </Dialog>
  );
}
