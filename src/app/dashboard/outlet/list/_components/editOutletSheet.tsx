"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { typeOutlet, OutletSchema } from "@/validations/OutletValidation";
import { useGetOutletById } from "@/hooks/outlets/useGetOutletById";
import { useUpdateOutlet } from "@/hooks/outlets/useUpdateOutlet";
import { toast } from "sonner";

export function EditOutletSheet({ id }: { id: number }) {
  const [open, isOpen] = useState(false)

  const { data: outlet, isPending } = useGetOutletById({
    id,
    queryConfig: { enabled: !!id },
  });

  const { mutate: updateOutlet, isPending: isUpdating } = useUpdateOutlet({ 
      id: id as number,
      mutationConfig: {
        onError: () => toast.error("Gagal update outlet!"),
        onSuccess: () => toast.success("Outlet berhasil diupdate!"),
      },
    });

  const form = useForm<typeOutlet>({
    resolver: zodResolver(OutletSchema),
    defaultValues: {
      nama: "",
      kota: "",
      alamat: "",
      tlp: "",
      gambar: "",
    },
  });

  useEffect(() => {
    if (outlet) {
      form.reset({
        nama: outlet.nama,
        kota: outlet.kota,
        alamat: outlet.alamat,
        tlp: outlet.tlp,
        gambar: outlet.gambar,
      });
    }
  }, [outlet]);

  const onSubmit = (values: typeOutlet) => {
    updateOutlet({ id, data: values });
    isOpen(false)
  };

  return (
    <Sheet open={open} onOpenChange={isOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full h-12 text-[15px]">Edit</Button>
      </SheetTrigger>

      <SheetContent className="space-y-3">
        <SheetHeader>
          <SheetTitle>Edit Outlet</SheetTitle>
          <SheetDescription>Perbarui data outlet di sini.</SheetDescription>
        </SheetHeader>

        {isPending && <p className="text-sm text-muted">Loading...</p>}

        {!isPending && (
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">

            <div className="space-y-2 px-3">
              <Label>Nama Outlet</Label>
              <Input {...form.register("nama")} />
            </div>

            <div className="space-y-2 px-3">
              <Label>Kota</Label>
              <Input {...form.register("kota")} />
            </div>

            <div className="space-y-2 px-3">
              <Label>Alamat</Label>
              <Input {...form.register("alamat")} />
            </div>

            <div className="space-y-2 px-3">
              <Label>Telepon</Label>
              <Input {...form.register("tlp")} />
            </div>

            <div className="space-y-2 px-3">
              <Label>URL Gambar</Label>
              <Input {...form.register("gambar")} />
            </div>

            <SheetFooter className="mt-6">
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? "Menyimpan..." : "Simpan Perubahan"}
              </Button>

              <SheetClose asChild>
                <Button variant="outline">Batal</Button>
              </SheetClose>
            </SheetFooter>

          </form>
        )}
      </SheetContent>
    </Sheet>
  );
}
