import { getSdk } from "@/graphql/graphql";
import { getGraphqlClient } from "@/libs/graphql-client";
import { useQuery } from "@tanstack/react-query";

export const useGetUserWithPlaceQuery = (id: number) => {
  return useQuery({
    queryKey: ["getUserWithPlace", id],
    queryFn: async () => {
      const data = await getSdk(await getGraphqlClient()).getUserWithPlace({
        id,
      });

      return data.user;
    },
  });
};
