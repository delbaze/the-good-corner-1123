// import "reflect-metadata";
// import datasource from "./lib/datasource";
// import { ApolloServer } from '@apollo/server';
// import { buildSchema } from "type-graphql";
// import { startStandaloneServer } from '@apollo/server/standalone';
import CategoryResolver from "./resolvers/category.resolver";
import AdResolver from "./resolvers/ad.resolver";
import TagResolver from "./resolvers/tag.resolver";

// async function main(){
//   const schema = await buildSchema({
//     resolvers: [AdResolver, CategoryResolver, TagResolver]
//   })
//   const server = new ApolloServer<{}>({
//     schema
//   });

//   await datasource.initialize()
//   const { url } = await startStandaloneServer(server, {
//     listen: { port: 4005 },

//   });

//   console.log(`🚀  Server ready at: ${url}`);
// }
// main();

import datasource from "./lib/datasource";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import express from "express";
import http from "http";
import cors from "cors";
import { buildSchema } from "type-graphql";
import "reflect-metadata";

const app = express();
const httpServer = http.createServer(app);

async function main() {
  const schema = await buildSchema({
    resolvers: [AdResolver, CategoryResolver, TagResolver],
    validate: false,
  });
  const server = new ApolloServer<{}>({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  app.use(
    "/",
    cors<cors.CorsRequest>({
      origin: ["http://localhost:3000", "https://studio.apollographql.com"],
      credentials: true
    }),
    express.json(),
    expressMiddleware(server)
  );
  await datasource.initialize();
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4005 }, resolve)
  );
  console.log(`🚀 Server lancé sur http://localhost:4005/`);
}

main();
