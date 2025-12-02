import { api } from "@/instance/axios";
import { getOrderQueryKey, getOrdersQueryKey } from "@/keys/orderKey";
import { MutationConfig, queryClient } from "@/providers/ReactQueryProvider";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";


type UpdateStatusOrder = {
  id: number;
  status: string; 
  
};

export const updateOrder = async ({id, status, }: UpdateStatusOrder) => {
  const res = await api.put(`order/${id}`, {status});
  return res.data
}

type useUpdateOrderParams = {
  mutationConfig?: MutationConfig<typeof updateOrder>;
  id: number
}

export const useUpdateOrder = (params: useUpdateOrderParams) => {
  return useMutation({
    mutationFn: updateOrder,
    ...params.mutationConfig,

    onSuccess(data, variables, onMutateResult, context) {
      queryClient.invalidateQueries({ queryKey: getOrdersQueryKey() });
      queryClient.invalidateQueries({ queryKey: getOrderQueryKey(params.id) });
    },
  })
}