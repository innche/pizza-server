import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import "dotenv/config";
import express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { dbOptions } from "./dbOptions";
import { DeliveryPrice } from "./entity/DeliveryPrice";
import { Pizza } from "./entity/Pizza";
import { OrderResolver } from "./resolvers/OrderResolver";
import { PizzaResolver } from "./resolvers/PizzaResolver";

if (process.env.NODE_ENV === "dev") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

(async () => {
  const app = express();
  app.use(cors({ origin: process.env.ALLOWED_ORIGIN, credentials: true }));
  app.get("/", (_req, res) => res.send("hello"));

  await createConnection(dbOptions)
    .then(async (connection: any) => {
      let deliveryPrice = await connection.manager.find(DeliveryPrice);
      if (deliveryPrice.length === 0) {
        console.log("Inserting delivery price into the database...");
        deliveryPrice = new DeliveryPrice();
        deliveryPrice.price = {
          priceEUR: 5,
          priceUSD: 6
        };
        await connection.manager.save(deliveryPrice);
        console.log("Delivery price saved.");
      }

      let pizzas = await connection.manager.find(Pizza);
      if (pizzas.length === 0) {
        console.log("Inserting pizzas into the database...");
        for (let i = 1; i <= 8; i++) {
          const pizza = new Pizza(),
            rnd = Math.random();

          pizza.name = `Pizza ${i}`;
          pizza.price = {
            priceEUR: Math.round(rnd * 15 + 15),
            priceUSD: Math.round(rnd * 13 + 17)
          };
          pizza.imageUrl =
            "https://images.all-free-download.com/images/graphicthumb/pizza_02_hd_pictures_167413.jpg";
          await connection.manager.save(pizza);
        }
        console.log("Saved pizzas");
      }
    })
    .catch((error) => console.log(error));

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PizzaResolver, OrderResolver],
      nullableByDefault: true
    })
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(process.env.PORT || 4000, () => {
    console.log("Express server is started");
  });
})();
