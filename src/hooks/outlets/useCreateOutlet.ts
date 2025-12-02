import { api } from "@/instance/axios";
import { MutationConfig, queryClient } from "@/providers/ReactQueryProvider";
import { useMutation } from "@tanstack/react-query";
import { typeOutlet } from "@/validations/OutletValidation";
import { toast } from "sonner";
import { getOutletsQueryKey } from "@/keys/outletKey";

export const createOutlet = async (data: typeOutlet) => {
  const res = await api.post("outlet", data)
  return res.data;
}

type useCreateOutletParams = {
  mutationConfig?: MutationConfig<typeof createOutlet>
}

export const useCreateOutlet = (params: useCreateOutletParams = {}) => {
  return useMutation({
    mutationFn: createOutlet,
    ...params.mutationConfig,
    onSuccess: () => {
      toast.success("success create outlet"), queryClient.invalidateQueries({ queryKey: getOutletsQueryKey()})
    }
  })
}