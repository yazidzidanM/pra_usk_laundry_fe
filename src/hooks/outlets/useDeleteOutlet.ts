import { api } from "@/instance/axios";
import { getOutletsQueryKey } from "@/keys/outletKey";
import { getPaketsQueryKey } from "@/keys/packetKey";
import { MutationConfig, queryClient } from "@/providers/ReactQueryProvider";
import { useMutation } from "@tanstack/react-query";

export const deleteOutlet = async (id: string | number) => {
  const res = await api.delete(`outlet/${id}`);
  return res.data;
};

type useDeleteOutletParams = {
  mutationConfig?: MutationConfig<typeof deleteOutlet>;
};

export const useDeleteOutlet = (params: useDeleteOutletParams = {}) => {
  return useMutation({
    mutationFn: deleteOutlet,
    ...params.mutationConfig,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getOutletsQueryKey()})
      queryClient.invalidateQueries({ queryKey: 
      getPaketsQueryKey()})
    },
  });
};
