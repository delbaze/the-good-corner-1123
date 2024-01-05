import "reflect-metadata";
// import typeDefs from "./typedefs";
// import resolvers from "./resolvers";
import datasource from "./lib/datasource";
import { ApolloServer } from '@apollo/server';
import { buildSchema } from "type-graphql";
import { startStandaloneServer } from '@apollo/server/standalone';
import CategoryResolver from "./resolvers/category.resolver";




async function main(){
  const schema = await buildSchema({
    resolvers: [CategoryResolver]
  })
  const server = new ApolloServer<{}>({
    // typeDefs,
    // resolvers,
    schema
  });

  await datasource.initialize()
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4005 },
  
  });
  
  console.log(`🚀  Server ready at: ${url}`);
}
main();