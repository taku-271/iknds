import { GraphQLClient } from "graphql-request";

const graphqlClientInstance = {
  default: new GraphQLClient(
    `${process.env.NEXT_PUBLIC_API_URL}/graphql` ||
      `${process.env.API_URL}/graphql`
  ),
} as const;

export const getGraphqlClient = async (
  instance: keyof typeof graphqlClientInstance = "default"
) => {
  return graphqlClientInstance[instance];
};
