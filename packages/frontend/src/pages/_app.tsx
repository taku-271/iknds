import type { AppProps } from "next/app";
import { Box, UIProvider } from "@yamada-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <UIProvider>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <Box
            height="98vh"
            display="flex"
            alignContent="center"
            justifyContent="center"
          >
            <Component {...pageProps} />
          </Box>
        </QueryClientProvider>
      </SessionProvider>
    </UIProvider>
  );
}
