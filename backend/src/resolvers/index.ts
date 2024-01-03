import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers } from "@graphql-tools/merge";

const resolversArray = loadFilesSync(".", { extensions: ["resolver.ts"] });

export default mergeResolvers(resolversArray);
