import { api } from "@/instance/axios";
import { getOrderQueryKey } from "@/keys/orderKey";
import { QueryConfig } from "@/providers/ReactQueryProvider";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { IOrder, responseOrder } from "./useGetOrders";


export const getOrderByIdUser = async (id: number): Promise<IOrder[]> => {
  const res = await api.get<responseOrder>(`/order/${id}`);
  return res.data.payload.data ?? [];
};

const getOrderByIdUserQueryOptions = (id: number) => {
  return queryOptions({
    queryKey: getOrderQueryKey(id),
    queryFn: () => getOrderByIdUser(id)
  })
}

type getOrderByIdUserParams = {
  queryConfig?: QueryConfig<typeof getOrderByIdUserQueryOptions>
  id: number
}

export const useGetOrderByIdUser = (params: getOrderByIdUserParams) => {
  return useQuery({
    ...getOrderByIdUserQueryOptions(params.id),
    ...params.queryConfig
  })
}