import { api } from "@/instance/axios";
import { getOrderQueryKey, getOrdersQueryKey } from "@/keys/orderKey";
import { MutationConfig, queryClient } from "@/providers/ReactQueryProvider";
import { TPesananForm } from "@/validations/OrderValidation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const createOrder = async (data: TPesananForm) => {
  const res = await api.post("auth/order", data);
  return res.data;
};

type useCreateOrderParams = {
  mutationConfig?: MutationConfig<typeof createOrder>;
  id: number
};

export const useCreateOrder = (params: useCreateOrderParams) => {
  return useMutation({
    mutationFn: createOrder,
    ...params.mutationConfig,
    onSuccess: () => {
      toast.success("Success create pesanan");
      queryClient.invalidateQueries({ queryKey: getOrdersQueryKey() });
      queryClient.invalidateQueries({ queryKey: getOrderQueryKey(params.id) });
    },
    onError: () => toast.error("Gagal membuat pesanan"),
  });
};
