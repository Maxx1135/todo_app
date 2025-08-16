import { queryClient } from "../main";

export const genericMutationResultFn = {
  onSuccess: ({ queryKeys }: { queryKeys: string[] }) => {
    queryKeys.forEach((key) => {
      queryClient.invalidateQueries({ queryKey: [key] });
    });
  },
};
