import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCreateOutlet } from "@/hooks/outlets/useCreateOutlet";
import { getOutletsQueryKey } from "@/keys/outletKey";
import { FormInput } from "@/layouts/atoms/form-input";
import { OutletSchema, typeOutlet } from "@/validations/OutletValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";


export default function AddOutletComponent() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<typeOutlet>({
    resolver: zodResolver(OutletSchema)
  });

  const {mutate: MutateOutlet, isPending} = useCreateOutlet()

  const onSubmit = (data: typeOutlet) => {
    MutateOutlet(data)
    reset()
  }

  return (
    <Card className="w-full max-w-lg mx-auto shadow-sm flex ">
      <CardHeader>
        <CardTitle>Form</CardTitle>
        <CardDescription>Tambahkan Outlet</CardDescription>
      </CardHeader>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-beween"
      >
        <CardContent className="grid gap-4">

          <FormInput
            label="gambar"
            name="gambar"
            register={register("gambar")}
            placeholder="Insert your gambar"
          />
          {errors.gambar && (
            <span className="text-red-500 text-sm">{errors.gambar.message}</span>
          )}

          <FormInput
            label="nama"
            name="nama"
            register={register("nama")}
            placeholder="Insert your nama"
          />
          {errors.nama && (
            <span className="text-red-500 text-sm">{errors.nama.message}</span>
          )}

          <FormInput
            label="Kota"
            name="kota"
            register={register("kota")}
            placeholder="Insert your kota"
          />
          {errors.kota && (
            <span className="text-red-500 text-sm">{errors.kota.message}</span>
          )}

          <FormInput
            label="Alamat"
            name="alamat"
            register={register("alamat")}
            placeholder="Insert your alamat"
          />

          {errors.alamat && (
            <span className="text-red-500 text-sm">{errors.alamat.message}</span>
          )}

          <FormInput
            label="Telfon"
            name="tlp"
            register={register("tlp")}
            placeholder="Insert your tlp"
          />

          {errors.tlp && (
            <span className="text-red-500 text-sm">{errors.tlp.message}</span>
          )}
        </CardContent>

        <CardFooter className="flex w-full justify-center mt-4">
          <Button disabled={isPending} type="submit" className="w-full">{isPending ? <Loader2 className="animate-spin" /> : "Confirm"}</Button>
        </CardFooter>
      </form>
    </Card>
  )
}