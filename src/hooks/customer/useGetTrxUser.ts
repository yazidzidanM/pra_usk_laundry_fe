"use client"
import { QueryConfig } from "@/providers/ReactQueryProvider";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/instance/axios";
import { getTrxQueryKey } from "@/keys/trxKey";
import { ResponseTrx, TTrx } from "../trx/useGetAllTrx";

export const getTrxUser = async (id_user: number): Promise<TTrx[]> => {
  const res = await api.get<ResponseTrx>(`/my_transaction/${id_user}`);
  return res.data?.payload?.data ?? [];
};
const getTrxUserQueryOptions = (id_user: number) => {
  return queryOptions({
    queryKey: getTrxQueryKey(id_user),
    queryFn: () => getTrxUser(id_user),
  });
};

type UseGetTrxUserParams = {
  queryConfig?: QueryConfig<typeof getTrxUserQueryOptions>;
  id_user: number
};

export const useGetTrxUser = (params: UseGetTrxUserParams) => {
  return useQuery({
    ...getTrxUserQueryOptions(params.id_user),
    ...params.queryConfig,
  });
};
