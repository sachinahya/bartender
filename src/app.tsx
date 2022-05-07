import { Outlet, ReactLocation, Router } from '@tanstack/react-location';
import { FC, StrictMode, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { FavouritesStoreProvider, LocalStorageFavouritesStore } from './api/favourite-drinks';
import { ErrorMessage } from './components/error-message';
import { LoadingView } from './components/layout';
import { useRoutes } from './routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});
const location = new ReactLocation();

const favouritesStore = new LocalStorageFavouritesStore();

const Routes: FC = () => {
  const routes = useRoutes();

  return (
    <Router
      location={location}
      routes={routes}
      defaultPendingElement={<LoadingView />}
      defaultPendingMs={1000}
      defaultPendingMinMs={500}
      defaultErrorElement={<ErrorMessage />}
    >
      {/* @ts-expect-error -- Properties are optional in ErrorMessage. */}
      <ErrorBoundary FallbackComponent={ErrorMessage}>
        <Suspense fallback={<LoadingView />}>
          <Outlet />
        </Suspense>
      </ErrorBoundary>
      {/* <ReactLocationDevtools /> */}
    </Router>
  );
};

export const App: FC = () => {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <FavouritesStoreProvider store={favouritesStore}>
          <ReactQueryDevtools />
          <Routes />
        </FavouritesStoreProvider>
      </QueryClientProvider>
    </StrictMode>
  );
};
