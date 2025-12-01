"use client";

import { api } from "@/instance/axios";
import { useMutation } from "@tanstack/react-query";
import { MutationConfig, queryClient } from "@/providers/ReactQueryProvider";
import { toast } from "sonner";
import { getPaketsQueryKey } from "@/keys/packetKey";

export const deletePaket = async (id: number) => {
  const res = await api.delete(`/paket/${id}`);
  return res.data;
};

type UseDeletePaketParams = {
  mutationConfig?: MutationConfig<typeof deletePaket>;
};

export const useDeletePaket = (params: UseDeletePaketParams = {}) => {
  return useMutation({
    mutationFn: deletePaket,
    ...params.mutationConfig,
    onSuccess(data, variables, onMutateResult, context) {
      toast.success("Berhasil menghapus paket!"),

      queryClient.invalidateQueries({ queryKey: getPaketsQueryKey() });
    },
  });
};
