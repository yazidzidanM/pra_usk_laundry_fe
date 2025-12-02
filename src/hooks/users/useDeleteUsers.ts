"use client"

import { api } from "@/instance/axios";
import { getUsersQueryKey } from "@/keys/usersKeey";
import { MutationConfig, queryClient } from "@/providers/ReactQueryProvider";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const deleteUser = async (id: string | number) => {
  const res = await api.delete(`user/${id}`);
  return res.data;
};

type UseDeleteUserParams = {
  mutationConfig?: MutationConfig<typeof deleteUser>;
};

export const useDeleteUser = (params: UseDeleteUserParams = {}) => {
  return useMutation({
    mutationFn: deleteUser,
    ...params.mutationConfig,
    onSuccess(data, variables, onMutateResult, context) {
      // toast.success("success delete user"),
          toast.promise<{ name: string }>(
            () =>
              new Promise((resolve) =>
                setTimeout(() => resolve({ name: "Event" }), 700)
              ),
            {
              loading: "Loading...",
              success: () => `success delete user`,
              error: "Error",
            }
          )
      queryClient.invalidateQueries({ queryKey: getUsersQueryKey() })
    },
  });
};