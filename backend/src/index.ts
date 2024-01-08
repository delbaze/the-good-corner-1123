import "reflect-metadata";
import datasource from "./lib/datasource";
import { ApolloServer } from '@apollo/server';
import { buildSchema } from "type-graphql";
import { startStandaloneServer } from '@apollo/server/standalone';
import CategoryResolver from "./resolvers/category.resolver";
import AdResolver from "./resolvers/ad.resolver";
import TagResolver from "./resolvers/tag.resolver";




async function main(){
  const schema = await buildSchema({
    resolvers: [AdResolver, CategoryResolver, TagResolver]
  })
  const server = new ApolloServer<{}>({
    schema
  });

  await datasource.initialize()
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4005 },
  
  });
  
  console.log(`🚀  Server ready at: ${url}`);
}
main();