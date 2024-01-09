import Layout from "@/components/layout/Layout";
// import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4005",
  cache: new InMemoryCache({
    addTypename: false
  }),
});

export default function App({ Component, pageProps }: AppProps) {
  //Imaginez charger la Layout ici sans perdre <Component {...pageProps} />
  return (
    <>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </>
  );
}
