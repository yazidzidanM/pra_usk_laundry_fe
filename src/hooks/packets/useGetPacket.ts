"use client"
import { QueryConfig } from "@/providers/ReactQueryProvider";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/instance/axios";
import { getPaketsQueryKey } from "@/keys/packetKey";

export type TPaket = {
  id?: number;
  jenis: string;
  nama_paket: string;
  harga: number;
  id_outlet: number;
};


export type ResponsePakets = {
  payload: {
    success: boolean;
    status: number;
    message: string;
    data: TPaket[];
  };
};

export const getPakets = async (): Promise<TPaket[]> => {
  const res = await api.get<ResponsePakets>("pakets");
  return res.data?.payload?.data ?? [];
};
const getPaketsQueryOptions = () => {
  return queryOptions({
    queryKey: getPaketsQueryKey(),
    queryFn: getPakets,
  });
};

type UseGetPaketsParams = {
  queryConfig?: QueryConfig<typeof getPaketsQueryOptions>;
};

export const useGetPakets = (params: UseGetPaketsParams = {}) => {
  return useQuery({
    ...getPaketsQueryOptions(),
    ...params.queryConfig,

  });
};
