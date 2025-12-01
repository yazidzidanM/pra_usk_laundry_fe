"use client"

import { api } from "@/instance/axios";
import { TPaket } from "./useGetPacket";
import { useMutation } from "@tanstack/react-query";
import { MutationConfig, queryClient } from "@/providers/ReactQueryProvider";
import { getPaketQueryKey, getPaketsQueryKey } from "@/keys/packetKey";

type UpdatePaketPayload = {
  id: number;
  data: TPaket;
};

export const updatePaket = async ({ id, data }: UpdatePaketPayload) => {
  const res = await api.put(`/paket/${id}`, data);
  return res.data;
};

type UseUpdatePaketParams = {
  mutationConfig?: MutationConfig<typeof updatePaket>;
  id:number;
};

export const useUpdatePaket = (params: UseUpdatePaketParams) => {
  return useMutation({
    mutationFn: updatePaket,
    ...params.mutationConfig,
    onSuccess(data, variables, onMutateResult, context) {
      queryClient.invalidateQueries({ queryKey: getPaketsQueryKey() });
      queryClient.invalidateQueries({ queryKey: getPaketQueryKey(params?.id!) });
    },
  });
};
