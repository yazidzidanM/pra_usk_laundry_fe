import { api } from "@/instance/axios";
import { QueryConfig } from "@/providers/ReactQueryProvider";
import { queryOptions, useQuery } from "@tanstack/react-query";

export interface IMember {
  id?: number,
  id_user: number,
  nama: string,
  alamat: string,
  jenis_kelamin: string,
  tlp: string
}

export type responseMember = {
  payload: {
    success: boolean;
    status: number;
    message: string;
    data: IMember;
  }
}

export const getCustomerMemberByIdUser = async (id: number): Promise<IMember> => {
  const res = await api.get<responseMember>(`auth/member/${id}`);
  return res.data.payload.data ?? [];
};

const getCustomerMemberByIdUserQueryOptions = (id: number) => {
  return queryOptions({
    queryKey: ["Member"],
    queryFn: () => getCustomerMemberByIdUser(id)
  })
}

type getCustomerMemberByIdUserParams = {
  queryConfig?: QueryConfig<typeof getCustomerMemberByIdUserQueryOptions>
  id: number
}

export const useGetCustomerMemberByIdUser = (params: getCustomerMemberByIdUserParams) => {
  return useQuery({
    ...getCustomerMemberByIdUserQueryOptions(params.id),
    ...params.queryConfig
  })
}