import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import express from "express";
import http from "http";
import cors from "cors";
import gql from "graphql-tag";

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs: gql`
    type Query {
      hello: String!
    }
  `,
  resolvers: {
    Query: {
      hello: () => "world",
    },
  },
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

(async () => {
  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server)
  );

  app.get("/health", (_req, res) => {
    res.status(200).end();
  });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 3001 }, resolve)
  );

  console.log("Server is running on http://localhost:3001/graphql");
})();
