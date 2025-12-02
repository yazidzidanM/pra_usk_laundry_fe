import { api } from "@/instance/axios";
import { getOrderQueryKey } from "@/keys/orderKey";
import { MutationConfig, queryClient } from "@/providers/ReactQueryProvider";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const deleteOrder = async (id: number) => {
  const res = await api.delete(`order/${id}`);
  return res.data;
};

type useDeleteOrderParams = {
  mutationConfig?: MutationConfig<typeof deleteOrder>;
  id: number
};

export const useDeleteOrder = (params: useDeleteOrderParams) => {
  return useMutation({
    mutationFn: deleteOrder,
    ...params.mutationConfig,
    onSuccess: () => {
      toast.success("Order berhasil diupdate"),
      queryClient.invalidateQueries({ queryKey: getOrderQueryKey(params.id!)});
    },
  });
};
