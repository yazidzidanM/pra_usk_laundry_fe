import { api } from "@/instance/axios";
import { getOrderQueryKey } from "@/keys/orderKey";
import { MutationConfig, queryClient } from "@/providers/ReactQueryProvider";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const doPayment = async (kode_invoice: string): Promise<{url: string}> => {
  const res = await api.post(`payment`, {kode_invoice});
  return res.data;
};

type useDoPaymentParams = {
  mutationConfig?: MutationConfig<typeof doPayment>;
  id: number;
};

export const useDoPayment = (params: useDoPaymentParams) => {
  return useMutation({
    mutationFn: doPayment,
    ...params.mutationConfig,
    onSuccess: () => {
      toast.success("success payment");
      queryClient.invalidateQueries({ queryKey: getOrderQueryKey(params.id) });
    },
    onError: () => toast.error("Gagal payment"),
  });
};
