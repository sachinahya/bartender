import { ReactLocation } from '@tanstack/react-location';
import parse from 'html-react-parser';
import { FC, Suspense, useMemo } from 'react';
import { DehydratedState, Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { FavouritesStoreProvider, LocalStorageFavouritesStore } from './api/favourite-drinks';
import { Routes } from './routes-component';
import { Shell } from './shell';

const favouritesStore = new LocalStorageFavouritesStore();

export interface AppProps {
  transformation: string;
  isServer: boolean;
  initialUrl?: string;
  location: ReactLocation;
  queryClient: QueryClient;
  queryState: DehydratedState;
  // routesProps: RoutesProps;
}

export const App: FC<AppProps> = ({
  transformation,
  isServer,
  initialUrl,
  location,
  queryClient,
  queryState,
}) => {
  const scripts = useMemo(() => {
    return parse(transformation);
  }, [transformation]);

  return (
    <Shell
      head={
        <>
          <script
            // eslint-disable-next-line react/no-danger -- Dev only.
            dangerouslySetInnerHTML={{
              __html:
                '__TRANSFORMATION__ = ' +
                JSON.stringify(transformation.replaceAll('</script>', '<\\/script>')) +
                '',
            }}
          />
          <script
            // eslint-disable-next-line react/no-danger -- Dev only.
            dangerouslySetInnerHTML={{
              __html: `window.__REACT_QUERY_STATE__ = ${JSON.stringify(queryState)};`,
            }}
          />
          {scripts}
        </>
      }
      body={
        <QueryClientProvider client={queryClient}>
          <Hydrate state={queryState}>
            <FavouritesStoreProvider store={favouritesStore}>
              <div>Content</div>
              <Suspense fallback="Loading the routes...">
                <Routes location={location} isServer={isServer} initialUrl={initialUrl} />
              </Suspense>
            </FavouritesStoreProvider>
          </Hydrate>
        </QueryClientProvider>
      }
    />
  );
};
