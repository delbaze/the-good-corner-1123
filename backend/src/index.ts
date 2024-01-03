import "reflect-metadata";
import typeDefs from "./typedefs";
console.log('%c⧭', 'color: #731d6d', typeDefs);
// import express from "express";
// import adsRouter from "./routes/ads.routes";
// import categoriesRouter from "./routes/categories.routes";
// import tagsRouter from "./routes/tags.routes";
// import datasource from "./lib/datasource";
// import cors from "cors";

// const app = express();

// app.use(cors({ origin: ["http://localhost:3000"] })); //permet de spécifier QUI a le droit de contacter le backend

// app.use(express.json()); //middleware

// app.use("/ads", adsRouter);
// app.use("/categories", categoriesRouter);
// app.use("/tags", tagsRouter);

// app.listen(4000, async () => {
//   await datasource.initialize(); //initialisation de la base de données
//   console.log("Le serveur est lancé sur le port 4000");
// });

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// // your data.
// const typeDefs = `#graphql
//   # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

//   # This "Book" type defines the queryable fields for every book in our data source.
//   type Book {
//     title: String
//     author: String
//   }

//   # The "Query" type is special: it lists all of the available queries that
//   # clients can execute, along with the return type for each. In this
//   # case, the "books" query returns an array of zero or more Books (defined above).
//   type Query {
//     books: [Book]
//   }
// `;

const resolvers = {
  Query: {
    books: () => books,
  },
};

const server = new ApolloServer({
  typeDefs,

  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests

async function main(){

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4005 },
  });
  
  console.log(`🚀  Server ready at: ${url}`);
}
main();