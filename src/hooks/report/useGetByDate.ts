import { api } from "@/instance/axios";
import { getReportsQueryKey } from "@/keys/reportKey";
import { QueryConfig } from "@/providers/ReactQueryProvider";
import { queryOptions, useQuery } from "@tanstack/react-query";

export type TReport = {
kode_invoice: string;
  nama_pelanggan?: string;
  tgl_transaksi: string;
  tgl_bayar: string | null;
  total: number;
  dibayar: string;
  status: string;
}

export type responseReport = {
  payload: {
    success: boolean;
    status: number;
    message: string;
    data: TReport[];
  };
};

export const getReportsByDate = async (dari: string, sampai: string): Promise<TReport[]> => {
  const res = await api.get<responseReport>("/report", { params: { dari, sampai } });
  return res.data.payload.data ?? [];
}

const getReportsByDateQueryOptions = (dari: string, sampai: string) => {
  return queryOptions({
    queryKey: getReportsQueryKey(dari, sampai),
    queryFn: () => getReportsByDate(dari, sampai),
  });
};

type UseGetReportsByDateParams = {
  queryConfig?: QueryConfig<typeof getReportsByDateQueryOptions>;
  dari: string;
  sampai: string;
};

export const useGetReportsByDate = (params: UseGetReportsByDateParams) => {
  return useQuery({
    ...getReportsByDateQueryOptions(params.dari, params.sampai),
    queryFn: () => getReportsByDate(params.dari, params.sampai),
    ...params.queryConfig,
  });
};