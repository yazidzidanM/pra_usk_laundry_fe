import { api } from "@/instance/axios";
import { getOrderQueryKey } from "@/keys/orderKey";
import { QueryConfig } from "@/providers/ReactQueryProvider";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { IOrder, responseOrder } from "../orders/useGetOrders";

export interface IBill {
  id?: number;
  dibayar: string;
  kode_invoice: string;
  nama: string,
  tlp: string,
  harga_total: number
}

type responseBill = {
  payload: {
      success: boolean;
      status: number;
      message: string;
      data: IBill[];
    }
}

export const getCustomerBillByIdUser = async (id: number): Promise<IBill[]> => {
  const res = await api.get<responseBill>(`auth/bill/${id}`);
  return res.data.payload.data;
};

const getCustomerBillByIdUserQueryOptions = (id: number) => {
  return queryOptions({
    queryKey: getOrderQueryKey(id),
    queryFn: () => getCustomerBillByIdUser(id)
  })
}

type getCustomerBillByIdUserParams = {
  queryConfig?: QueryConfig<typeof getCustomerBillByIdUserQueryOptions>
  id: number
}

export const useGetCustomerBillByIdUser = (params: getCustomerBillByIdUserParams) => {
  return useQuery({
    ...getCustomerBillByIdUserQueryOptions(params.id),
    ...params.queryConfig
  })
}