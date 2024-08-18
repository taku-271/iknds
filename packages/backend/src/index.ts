import { config } from "dotenv";
import { createSchema, createYoga } from "graphql-yoga";
import createContext from "./context";
import { typeDefs } from "./graphql/typeDefs.generated";
import { resolvers } from "./graphql/resolvers.generated";

config();

const yoga = createYoga({
  logging: false,
  schema: createSchema({
    typeDefs: typeDefs,
    resolvers,
  }),
  context: createContext(),
  cors: {
    origin: "*",
  },
});

const server = Bun.serve({
  port: process.env.PORT || 4000,
  fetch: (request) => yoga(request),
});

console.log(`🚀 Server ready at http://localhost:${process.env.PORT || 4000}`);
