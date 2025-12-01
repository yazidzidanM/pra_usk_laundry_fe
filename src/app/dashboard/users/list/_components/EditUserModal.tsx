"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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

import { useEffect } from "react";
import { TUsers } from "../page";
import { typeUpdateUser, updateUserSchema } from "@/validations/UsersValidation";

export function EditUserModal({
  open,
  onOpenChange,
  user,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  user: TUsers | null;
  onSubmit: (values: typeUpdateUser) => void;
}) {
  const { data: outlets = [] } = useGetOutlets();

  const form = useForm<typeUpdateUser>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      nama: "",
      username: "",
      id_outlet: 0,
      role: "",
    },
  });

  useEffect(() => {
  if (open && user) {
    form.reset({
      nama: user.nama,
      username: user.username,
      id_outlet: user.id_outlet!,
      role: user.role,
    });
  }
}, [open, user]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

          <div className="space-y-2">
            <Label>Nama</Label>
            <Input {...form.register("nama")} />
          </div>

          <div className="space-y-2">
            <Label>Username</Label>
            <Input {...form.register("username")} />
          </div>
          
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
            <Label>Role</Label>
            <Select
              value={form.watch("role")}
              onValueChange={(v) => form.setValue("role", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="owner">Owner</SelectItem>
                <SelectItem value="kasir">Kasir</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
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
