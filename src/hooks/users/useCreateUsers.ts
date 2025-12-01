"use client"

import { TUsers } from "@/app/dashboard/users/list/page";
import { api } from "@/instance/axios";
import { MutationConfig } from "@/providers/ReactQueryProvider";
import { useMutation } from "@tanstack/react-query";

  export const createUser = async (data: TUsers) => {
  const res = await api.post("user", data);
  return res.data;
};

type UseCreateUserParams = {
  mutationConfig?: MutationConfig<typeof createUser>;
};

export const useCreateUser = (params: UseCreateUserParams) => {
  return useMutation({
    mutationFn: createUser,
    ...params.mutationConfig,
  });
};