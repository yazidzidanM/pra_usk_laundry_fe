import { api } from "@/instance/axios";
import { getOutletQueryKey, getOutletsQueryKey } from "@/keys/outletKey";
import { MutationConfig, queryClient } from "@/providers/ReactQueryProvider";
import { typeOutlet } from "@/validations/OutletValidation";
import { useMutation } from "@tanstack/react-query";

type UpdateOutletPayload = {
  id: string | number;
  data: typeOutlet; 
};

export const updateOutlet = async ({ id, data }: UpdateOutletPayload) => {
  const res = await api.put(`outlet/${id}`, data);
  return res.data;
};

type useUpdateOutletParams = {
  mutationConfig?: MutationConfig<typeof updateOutlet>;
  id: number
};

export const useUpdateOutlet = (params: useUpdateOutletParams) => {
  return useMutation({
    mutationFn: updateOutlet,
    ...params.mutationConfig,
    onSuccess(data, variables, onMutateResult, context) {
      queryClient.invalidateQueries({ queryKey: getOutletsQueryKey() });
      queryClient.invalidateQueries({ queryKey: getOutletQueryKey(params?.id!) });
    },
  });
};
