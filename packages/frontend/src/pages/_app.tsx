import type { AppProps } from "next/app";
import { Box, UIProvider } from "@yamada-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UIProvider>
      <QueryClientProvider client={queryClient}>
        <Box height="98vh">
          <Component {...pageProps} />
        </Box>
      </QueryClientProvider>
    </UIProvider>
  );
}
