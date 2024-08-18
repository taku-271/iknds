import { getSdk, UserInput } from "@/graphql/graphql";
import { getGraphqlClient } from "@/libs/graphql-client";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useSignUpMutation = () => {
  return useMutation({
    mutationKey: ["signUp"],
    mutationFn: async (input: UserInput) => {
      return await getSdk(await getGraphqlClient()).createUser({
        input,
      });
    },
  });
};
