"use client"
import { QueryConfig } from "@/providers/ReactQueryProvider";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/instance/axios";
import { getTrxsQueryKey } from "@/keys/trxKey";

export type TStatus = "baru" | "proses" | "selesai" | "diambil";

export type TTrx = {
  id: number;
  id_outlet: number;
  kode_invoice: string;
  id_member: number;
  tgl: string | null;
  batas_waktu: string | null;
  tgl_bayar: string | null;
  biaya_tambahan: number;
  diskon: number;
  pajak: number;
  status: TStatus;
  dibayar: string;
  id_user: number;
  id_pesanan: number;
};


export type ResponseTrx = {
  payload: {
    success: boolean;
    status: number;
    message: string;
    data: TTrx[];
  };
};

export const getTrxs = async (): Promise<TTrx[]> => {
  const res = await api.get<ResponseTrx>("/transaction");
  return res.data?.payload?.data ?? [];
};
const getTrxsQueryOptions = () => {
  return queryOptions({
    queryKey: getTrxsQueryKey(),
    queryFn: getTrxs,
  });
};

type UseGetTrxsParams = {
  queryConfig?: QueryConfig<typeof getTrxsQueryOptions>;
};

export const useGetTrxs = (params: UseGetTrxsParams = {}) => {
  return useQuery({
    ...getTrxsQueryOptions(),
    ...params.queryConfig,

  });
};
