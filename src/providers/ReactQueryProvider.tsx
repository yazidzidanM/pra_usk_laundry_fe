"use client"

import {
  QueryClient,
  QueryClientProvider,
  UseMutationOptions
} from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      onError: () => {
        alert("mutation error")
      }
    }
  }
})

export default function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

export type APiFnReturnType<FnType extends (...args: any) => Promise<any>> = Awaited<ReturnType<FnType>>

export type QueryConfig<T extends (...args: any[]) => any> = Omit<ReturnType<T>, "queryKey" | "queryFn">;

export type MutationConfig<MutationFnType extends (...args: any) => Promise<any>> = UseMutationOptions<APiFnReturnType<MutationFnType>,
  Error,
  Parameters<MutationFnType>[0]
>