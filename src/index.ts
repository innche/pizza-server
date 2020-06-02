import { ApolloServer } from "apollo-server-express";
import express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { PizzaResolver } from "./resolvers/PizzaResolver";

(async () => {
  const app = express();
  app.get("/", (_req, res) => res.send("hello"));

  await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PizzaResolver]
    })
  });

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("Express server is started");
  });
})();
