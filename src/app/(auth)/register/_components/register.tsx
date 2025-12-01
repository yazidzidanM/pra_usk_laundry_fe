"use client"

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { INITIAL_STATE_REGISTER_FORM } from "@/constants/auth-constant";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { registerAction } from "../actionRegister";
import { registerSchema, typeRegister } from "@/validations/authValidation";
import { FormInput } from "@/layouts/atoms/form-input";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(registerAction, INITIAL_STATE_REGISTER_FORM)
  const router = useRouter()

  const { register, handleSubmit, reset, formState: { errors } } = useForm<typeRegister>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = (data: typeRegister) => {
    const formData = new FormData()
    formData.append("nama", data.nama)
    formData.append("username", data.username)
    formData.append("password", data.password)
    formData.append("confirmPassword", data.confirmPassword)

    startTransition(() => {
      formAction(formData)
    })
  }

  useEffect(() => {
      if (state?.success) {
        reset();
        router.push("/");
        return;
      }
      if (state?.error) {
        toast.error("something error, please try again...");
        console.log(state.error);
      }
    }, [state]);

  return (
    <div className="flex flex-col items-center space-y-2">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Register new account</CardTitle>
          <CardDescription>
            If you already have account, login instead
          </CardDescription>
          <CardAction>
            <Button size="default" variant="link">
              <Link href="/login">Login</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 flex flex-col" method="POST">
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

            <FormInput
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              register={register("confirmPassword")}
              placeholder="confirm your password"
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>
            )}
            <Button disabled={isPending} type="submit" className="mr-2 h-full w-full mt-4">{isPending ? <Loader2 className="animate-spin" /> : "Register"}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
