import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { CreatePlaceMutation, getSdk, PlaceInput } from "@/graphql/graphql";
import { getGraphqlClient } from "@/libs/graphql-client";

export const useCreatePlaceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<CreatePlaceMutation, unknown, PlaceInput>({
    mutationKey: ["createPlaceMutation"],
    mutationFn: async (input) => {
      return getSdk(await getGraphqlClient()).createPlace({
        input,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getUserWithPlace"],
      });
    },
  });
};
