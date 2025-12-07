import { api } from "@/instance/axios";
import { getTrxQueryKey } from "@/keys/trxKey";
import { MutationConfig, queryClient } from "@/providers/ReactQueryProvider";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const takeCustomerOrder = async (id: number) => {
  const res = await api.put(`auth/trx/${id}`);
  return res.data;
};
