import { TUsers } from "@/app/dashboard/users/list/page";
import { api } from "@/instance/axios"
import { getUserQueryKey } from "@/keys/usersKeey";
import { QueryConfig } from "@/providers/ReactQueryProvider";
import { queryOptions, useQuery } from "@tanstack/react-query";

type responseUser = {
  payload: {
      success: boolean;
      status: number;
      message: string;
      data: TUsers;
    };
}

export const getUserById = async (id: number): Promise<TUsers> => {
  const res = await api.get<responseUser>(`/user/${id}`)
  return res.data.payload.data ?? null
}

const getUserByIdQueryOptions = (id: number) => {
  return queryOptions({
    queryKey: getUserQueryKey(id),
    queryFn: () => getUserById(id)
  })
} 

type useGetUserByIdParams = {
  queryConfig?: QueryConfig<typeof getUserByIdQueryOptions>;
  id: number
}

export const useGetUserById = (params: useGetUserByIdParams) => {
  return useQuery({
    ...getUserByIdQueryOptions(params.id),
    ...params.queryConfig
  })
}