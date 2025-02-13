"use client";

import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    return new QueryClient({
      defaultOptions: {
        queries: {
          // With SSR, we want to avoid refetching immediately on the client
          staleTime: 60 * 1000,
        },
      },
    });
  } else {
    if (!browserQueryClient) browserQueryClient = new QueryClient();
    return browserQueryClient;
  }
}

export const QueryClientContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
