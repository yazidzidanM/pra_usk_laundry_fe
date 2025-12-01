"use client"

import { api } from "@/instance/axios";
import { TPaket } from "./useGetPacket";
import { useMutation } from "@tanstack/react-query";
import { MutationConfig, queryClient } from "@/providers/ReactQueryProvider";
import { TPaketForm } from "@/validations/PacketValidation";

export const createPaket = async (data: TPaketForm) => {
  const res = await api.post("paket", data);
  return res.data;
};

type UseCreatePaketParams = {
  mutationConfig?: MutationConfig<typeof createPaket>;
};

export const useCreatePaket = (params: UseCreatePaketParams) => {
  return useMutation({
    mutationFn: createPaket,
    ...params.mutationConfig,
  });
};