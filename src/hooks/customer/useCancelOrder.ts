import { api } from "@/instance/axios";
import { getOrderQueryKey } from "@/keys/orderKey";
import { MutationConfig, queryClient } from "@/providers/ReactQueryProvider";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const deleteCustomerOrder = async (id: number) => {
  const res = await api.delete(`auth/order/${id}`);
  return res.data;
};

type useDeleteCustomerOrderParams = {
  mutationConfig?: MutationConfig<typeof deleteCustomerOrder>;
  id: number
};

export const useDeleteCustomerOrder = (params: useDeleteCustomerOrderParams) => {
  return useMutation({
    mutationFn: deleteCustomerOrder,
    ...params.mutationConfig,
    onSuccess: () => {
      toast.success("Order berhasil diupdate"),
      queryClient.invalidateQueries({ queryKey: getOrderQueryKey(params.id!)});
    },
  });
};
