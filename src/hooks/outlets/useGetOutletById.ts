import { api } from "@/instance/axios"
import { IOutlet } from "./useGetOutlets";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { getOutletQueryKey } from "@/keys/outletKey";
import { QueryConfig } from "@/providers/ReactQueryProvider";

type responseOutlet = {
  payload: {
    success: boolean;
    status: number;
    message: string;
    data: IOutlet;
  }
}

export const getOutletbyId = async (id: number): Promise<IOutlet> => {
  const res = await api.get<responseOutlet>(`outlet/${id}`)
  return res.data.payload.data
}

const getOutletByIdQueryOptions = (id: number) => {
  return queryOptions({
    queryKey: getOutletQueryKey(id),
    queryFn: () => getOutletbyId(id),
  })
}

type useGetOutletByIdParams = {
  queryConfig?: QueryConfig<typeof getOutletByIdQueryOptions>;
  id: number
}

export const useGetOutletById = (params: useGetOutletByIdParams) => {
  return useQuery({
    ...getOutletByIdQueryOptions(params.id),
    ...params.queryConfig
  })
}