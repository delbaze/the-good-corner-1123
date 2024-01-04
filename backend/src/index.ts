import "reflect-metadata";
import typeDefs from "./typedefs";
import resolvers from "./resolvers";
import datasource from "./lib/datasource";

// import adsRouter from "./routes/ads.routes";
// import categoriesRouter from "./routes/categories.routes";
// import tagsRouter from "./routes/tags.routes";
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



const server = new ApolloServer<{}>({
  typeDefs,
  resolvers,
  // formatError(formattedError, error) {
  //   return formattedError
  // },
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests

async function main(){
  await datasource.initialize()
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4005 },
  
  });
  
  console.log(`🚀  Server ready at: ${url}`);
}
main();