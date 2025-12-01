"use client";

import { useForm } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { startTransition, useActionState, useEffect } from "react";
import { AddUserAction } from "../(action)/actionAddUser";
import { INITIAL_STATE_USERS_FORM } from "@/constants/users-constant";
import { typeUsers, usersSchema } from "@/validations/UsersValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/layouts/atoms/form-input";
import { IOutlet, useGetOutlets } from "@/hooks/outlets/useGetOutlets";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { queryClient } from "@/providers/ReactQueryProvider";
import { getUsersQueryKey } from "@/keys/usersKeey";

export default function AddUserForm() {
  const [state, formAction, isPending] = useActionState(AddUserAction, INITIAL_STATE_USERS_FORM)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<typeUsers>({
    resolver: zodResolver(usersSchema)
  });
  const onSubmit = (data: typeUsers) => {
    const formData = new FormData()
    formData.append("nama", data.nama)
    formData.append("username", data.username)
    formData.append("password", data.password)
    formData.append("id_outlet", data.id_outlet.toString())
    formData.append("role", data.role)

    startTransition(() => {
      formAction(formData)
    })
  }

  useEffect(() => {
    if (state.success) {
      toast.success("success");
      queryClient.invalidateQueries({ queryKey: getUsersQueryKey() });
      reset()
    }
  }, [state]);

  const { data: data_outlet, isLoading: loadingOutlet, error: errorOutlet } = useGetOutlets()

  return (
    <Card className="w-full max-w-lg mx-auto shadow-sm flex ">
      <CardHeader>
        <CardTitle>Form</CardTitle>
        <CardDescription>Tambahkan data user</CardDescription>
      </CardHeader>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-beween"
      >
        <CardContent className="grid gap-4">

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
            label="Username"
            name="username"
            register={register("username")}
            placeholder="Insert your username"
          />
          {errors.username && (
            <span className="text-red-500 text-sm">{errors.username.message}</span>
          )}

          <FormInput
            label="Password"
            type="password"
            name="password"
            register={register("password")}
            placeholder="Insert your password"
          />

          {errors.password && (
            <span className="text-red-500 text-sm">{errors.password.message}</span>
          )}

          <div className="grid gap-2">
            <Label>id outlet</Label>
            <select
              {...register("id_outlet", { valueAsNumber: true })}
              required
              className="border rounded-md px-3 py-2 text-sm bg-background"
            >
              <option disabled value="">Pilih id outlet</option>
              {data_outlet?.map((choose: IOutlet) => (
                <option value={choose.id} key={choose.id}>{choose.id}</option>
              ))}
            </select>
            {errors.id_outlet && <span className="text-red-500 text-sm">{errors.id_outlet?.message}</span>}
          </div>

          <div className="grid gap-2">
            <Label>Role</Label>
            <select
              {...register("role")}
              className="border rounded-md px-3 py-2 text-sm bg-background"
            >
              <option disabled value="">Pilih role</option>
              <option value="user">User</option>
              <option value="owner">Owner</option>
              <option value="kasir">Kasir</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && <span className="text-red-500 text-sm">{errors.role?.message}</span>}
          </div>

        </CardContent>

        <CardFooter className="flex w-full justify-center mt-4">
          <Button disabled={isPending} type="submit" className="w-full">{isPending ? <Loader2 className="animate-spin" /> : "Confirm"}</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
