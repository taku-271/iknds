import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { client } from "../libs/graphql-client";
import { Box } from "@yamada-ui/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Box height="100vh">
        <Component {...pageProps} />
      </Box>
    </ApolloProvider>
  );
}
