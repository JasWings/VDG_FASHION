import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import type { AppProps } from 'next/app';

interface QueryProviderProps {
  pageProps: AppProps['pageProps'];
}

export default function QueryProvider({
  pageProps,
  children,
}: React.PropsWithChildren<QueryProviderProps>) {
  const [queryClient] = useState(() => new QueryClient(
    {
      defaultOptions:{
        //@ts-ignore
        staleTime: Infinity, 
        revalidateOnFocus: false,
        refetchOnWindowFocus: false,

      }
    }
  ));

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate
        state={
          //@ts-ignore
          pageProps.dehydratedState
        }
      >
        {children}
      </Hydrate>
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  );
}
