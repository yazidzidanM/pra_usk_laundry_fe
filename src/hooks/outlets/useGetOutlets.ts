import { api } from "@/instance/axios";
import { getOutletsQueryKey } from "@/keys/outletKey";
import { QueryConfig } from "@/providers/ReactQueryProvider";
import { queryOptions, useQuery } from "@tanstack/react-query";

export interface IOutlet {
  id?: number;
  gambar: string;
  kota: string;
  nama: string;
  alamat: string;
  tlp: string;
}

type responseOutlet = {
  payload: {
    success: boolean;
    status: number;
    message: string;
    data: IOutlet[];
  }
}

export const getOutlets = async () : Promise<IOutlet[]>=> {
  const res = await api.get<responseOutlet>("/outlets");
    return res.data?.payload?.data ?? []
};

const getOutletsQueryOptions = () => {
  return queryOptions({
    queryKey: getOutletsQueryKey(),
    queryFn: getOutlets,
  })
}

type getOutletsParams = {
  queryConfig?: QueryConfig<typeof getOutletsQueryOptions>
}

export const useGetOutlets = (params: getOutletsParams = {}) => {
  return useQuery({
    ...getOutletsQueryOptions(),
    ...params.queryConfig,
  })
}