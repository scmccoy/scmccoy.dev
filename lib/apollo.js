// apollo hoc
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import fetch from "isomorphic-unfetch";
import Head from "next/head";
import { InMemoryCache } from "apollo-cache-inmemory";

export function withApollo(PageComponent) {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    const client = apolloClient || initApolloClient(apolloState);

    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };

  // get initialProps (react lifecycle for next js only);
  // allows us to set the initial props (apolloclient, state and props)
  WithApollo.getInitialProps = async (ctx) => {
    const { AppTree } = ctx;
    const apolloClient = (ctx.apolloClient = initApolloClient());

    let pageProps = {};
    if (PageComponent.getInitialProps) {
      pageProps = await PageComponent.getInitialProps(ctx);
    }
    // if on server
    if (typeof window === "undefined") {
      if (ctx.res && ctx.res.finished) {
        return pageProps;
      }

      try {
        // make sure we have all data before rendering
        const { getDataFromTree } = await import("@apollo/react-ssr");
        await getDataFromTree(
          // entire app tree. render it w/ apollo data
          <AppTree pageProps={{ ...pageProps, apolloClient }} />
        );
      } catch (e) {
        console.error("getDataFromTree Error => ", e);
      }

      // clear head
      Head.rewind();
    }
    // extracts the client out and returns as the initial props
    const apolloState = apolloClient.cache.extract();

    return {
      ...pageProps,
      apolloState,
    };
  };

  return WithApollo;
}


const initApolloClient = (initialState = {}) => {
  const isDev = process.env.NODE_ENV !== "production";
  const url = isDev ? 'http://localhost:3000' : 'https://shanemccoy.dev/pages';
  console.log('URL? ', url);
  // const ssrMode = typeof window === 'undefined';
  const cache = new InMemoryCache().restore(initialState);

  const client = new ApolloClient({
    // ssrMode,
    // uri: "https://www.graphqlhub.com/graphql", // REDDIT REACT PAGE
    uri: `${url}/api/graphql`,
    fetch,
    cache,
  });
  return client;
};
