"use client";

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { INITIAL_STATE_LOGIN_FORM } from "@/constants/auth-constant";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { loginAction } from "../actionLogin";
import { Loader2 } from "lucide-react";
import { loginSchema, typeLogin } from "@/validations/authValidation";
import { useRouter } from "next/navigation";
import { FormInput } from "@/layouts/atoms/form-input";
import { useAuthStore } from "@/menageState/zustandStore";

export default function Login() {
  const [state, formAction, isPending] = useActionState(loginAction, INITIAL_STATE_LOGIN_FORM);
  const router = useRouter();
  const setLogin = useAuthStore((s) => s.setLogin);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<typeLogin>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = (data: typeLogin) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);

    startTransition(() => {
      formAction(formData);
    });
  };

  useEffect(() => {
    if (state?.success && state.user && state.token) {
      setLogin(state.user, state.token);
      reset()
      router.push("/");
      console.log(state)
      return;
    }
    if (state?.error) {
      toast.error(state.error || "Login gagal");
    }
  }, [state]);

  return (
    <div className="flex flex-col items-center mt-4 space-y-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>If you don't have an account, register new account</CardDescription>
          <CardAction>
            <Button size="default" variant="link">
              <Link href="/register">Register</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 flex flex-col" method="POST">
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

            <Button disabled={isPending} type="submit" className="mt-4 w-full">
              {isPending ? <Loader2 className="animate-spin" /> : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
