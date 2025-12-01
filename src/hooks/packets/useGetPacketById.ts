import { api } from "@/instance/axios";
import { getPaketQueryKey, getPaketsQueryKey } from "@/keys/packetKey";
import { QueryConfig } from "@/providers/ReactQueryProvider";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { TurbopackMessageSentToBrowser } from "next/dist/server/dev/hot-reloader-types";
import { TPaket } from "./useGetPacket";

export type ResponsePaket = {
  payload: {
    success: boolean;
    status: number;
    message: string;
    data: TPaket;
  };
};

export const getPaketById = async (id: number): Promise<TPaket> => {
  const res = await api.get<ResponsePaket>(`/paket/${id}`);
  return res.data?.payload?.data ?? null;
}

const getPaketByIdQueryOptions = (id: number) => {
  return queryOptions({
    queryKey: getPaketQueryKey(id),
    queryFn: () => getPaketById(id),
  });
}

type useGetPaketByIdParams = {
  queryConfig?: QueryConfig<typeof getPaketByIdQueryOptions>;
  id: number
}

export const useGetPaketById = (params: useGetPaketByIdParams) => {
  return useQuery({
    ...getPaketByIdQueryOptions(params.id),
    ...params.queryConfig,
  })
}  