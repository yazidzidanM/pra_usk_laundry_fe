import { api } from "@/instance/axios";
import { getOrdersQueryKey } from "@/keys/orderKey";
import { QueryConfig } from "@/providers/ReactQueryProvider";
import { queryOptions, useQuery } from "@tanstack/react-query";


export interface IOrder {
  id: number,
  id_user: number,
  nama: number,
  jenis_kelamin: string,
  alamat: string,
  tlp: number,
  id_outlet: number,
  id_paket: number,
  jenis: string,
  nama_paket: string,
  harga: number,
  qty: number,
  harga_total: number,
  status: string,
  keterangan: string,
  dibayar: string,
}

export type responseOrder = {
  payload: {
    success: boolean;
    status: number;
    message: string;
    data: IOrder[];
  }
}

export const getOrders = async (): Promise<IOrder[]> => {
  const res = await api.get<responseOrder>("/orders");
  return res.data.payload.data ?? []
}

const getOrdersQueryOptions = () => {
  return queryOptions({
    queryKey: getOrdersQueryKey(),
    queryFn: getOrders
  })
}

type getOrdersParams = {
  queryConfig?: QueryConfig<typeof getOrdersQueryOptions>;
}

export const useGetOrders = (params: getOrdersParams = {}) => {
  return useQuery({
    ...getOrdersQueryOptions(),
    ...params.queryConfig,
  })
}