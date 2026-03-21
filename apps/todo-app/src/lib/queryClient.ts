import { QueryClient } from '@tanstack/react-query';

export const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });
};

let clientQueryClientInstance: QueryClient | undefined;

export const getQueryClient = () => {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return createQueryClient();
  }
  // Browser: make a single query client for the app
  if (!clientQueryClientInstance) {
    clientQueryClientInstance = createQueryClient();
  }
  return clientQueryClientInstance;
};
