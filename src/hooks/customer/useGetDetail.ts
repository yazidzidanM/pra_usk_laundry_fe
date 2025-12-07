import { api } from "@/instance/axios";
import { QueryConfig } from "@/providers/ReactQueryProvider";
import { queryOptions, useQuery } from "@tanstack/react-query";

export interface IDetail {
  id?: number,
  id_transaksi: number,
  id_paket: number,
  qty: number,
  keterangan: string
  status: string
}

export type responseDetail = {
  payload: {
    success: boolean;
    status: number;
    message: string;
    data: IDetail[];
  }
}

export const getCustomerDetailByIdUser = async (id_user: number): Promise<IDetail[]> => {
  const res = await api.get<responseDetail>(`auth/detail/${id_user}`);
  return res.data.payload.data ?? [];
};

export const getCustomerDetailByIdUserQueryKey = (id_user: number) => ["Detail", id_user];

const getCustomerDetailByIdUserQueryOptions = (id_user: number) => {
  return queryOptions({
    queryKey: getCustomerDetailByIdUserQueryKey(id_user),
    queryFn: () => getCustomerDetailByIdUser(id_user)
  })
}

type getCustomerDetailByIdUserParams = {
  queryConfig?: QueryConfig<typeof getCustomerDetailByIdUserQueryOptions>
  id_user: number
}

export const useGetCustomerDetailByIdUser = (params: getCustomerDetailByIdUserParams) => {
  return useQuery({
    ...getCustomerDetailByIdUserQueryOptions(params.id_user),
    ...params.queryConfig
  })
}