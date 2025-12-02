"use client"

import { TUsers } from "@/app/dashboard/users/list/page";
import { api } from "@/instance/axios";
import { getUserQueryKey, getUsersQueryKey } from "@/keys/usersKeey";
import { MutationConfig, queryClient } from "@/providers/ReactQueryProvider";
import { useMutation } from "@tanstack/react-query";

type UpdateUserPayload = {
  id: string | number;
  data: TUsers;
};

export const updateUser = async ({ id, data }: UpdateUserPayload) => {
  const res = await api.put(`user/${id}`, data);
  return res.data;
};

type UseUpdateUserParams = {
  mutationConfig?: MutationConfig<typeof updateUser>;
  id: number;
};

export const useUpdateUser = (params: UseUpdateUserParams) => {
  return useMutation({
    mutationFn: updateUser,
    ...params.mutationConfig,

    onSuccess(data, variables, onMutateResult, context) {
      queryClient.invalidateQueries({ queryKey: getUsersQueryKey() });
      queryClient.invalidateQueries({ queryKey: getUserQueryKey(params?.id!) });
    },
  });
};