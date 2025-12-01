"use client"

import { api } from "@/instance/axios"
import { getUsersQueryKey } from "@/keys/usersKeey";
import { QueryConfig } from "@/providers/ReactQueryProvider";
import { queryOptions, useQuery } from "@tanstack/react-query";

type TUsers = {
  id: number;
  username: string;
  nama: string;
  id_outlet: number | null;
  role: "kasir" | "owner" | "user";
}

type response = {
  payload: {
    success: boolean;
    status: number;
    message: string;
    data: TUsers[];
  }
}

export const getUsers = async (): Promise<TUsers[]> => {
  const res = await api.get<response>("/users")
  return res.data?.payload?.data ?? []
}

const getUsersQueryOptions = () => {
  return queryOptions({
    queryKey: getUsersQueryKey(),
    queryFn: getUsers,
  })
}

type getUsersParams = {
  queryConfig?: QueryConfig<typeof getUsersQueryOptions>
}

export const useGetUsers = (params: getUsersParams = {}) => {
  return useQuery({
    ...getUsersQueryOptions(),
    ...params.queryConfig,
  })
}