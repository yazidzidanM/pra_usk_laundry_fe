import { api } from "@/instance/axios";
import { getOrderQueryKey } from "@/keys/orderKey";
import { QueryConfig } from "@/providers/ReactQueryProvider";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { IOrder, responseOrder } from "../orders/useGetOrders";

export const getCustomerOrderByIdUser = async (id: number): Promise<IOrder[]> => {
  const res = await api.get<responseOrder>(`auth/order/${id}`);
  return res.data.payload.data ?? [];
};

const getCustomerOrderByIdUserQueryOptions = (id: number) => {
  return queryOptions({
    queryKey: getOrderQueryKey(id),
    queryFn: () => getCustomerOrderByIdUser(id)
  })
}

type getCustomerOrderByIdUserParams = {
  queryConfig?: QueryConfig<typeof getCustomerOrderByIdUserQueryOptions>
  id: number
}

export const useGetCustomerOrderByIdUser = (params: getCustomerOrderByIdUserParams) => {
  return useQuery({
    ...getCustomerOrderByIdUserQueryOptions(params.id),
    ...params.queryConfig
  })
}