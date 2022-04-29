import { Outlet, ReactLocation, Router } from '@tanstack/react-location';
import { FC, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { ErrorMessage } from './components/error-message';
import { createRoutes } from './routes';
import { LoadingView } from './views/layout/loading-view';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});
const location = new ReactLocation();
const routes = createRoutes(queryClient);

export const App: FC = () => (
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools />
    <Router
      location={location}
      routes={routes}
      defaultPendingElement={<LoadingView />}
      defaultPendingMs={1000}
      defaultPendingMinMs={500}
    >
      <ErrorBoundary FallbackComponent={ErrorMessage}>
        <Suspense fallback={<LoadingView />}>
          <Outlet />
        </Suspense>
      </ErrorBoundary>
      {/* <ReactLocationDevtools /> */}
    </Router>
  </QueryClientProvider>
);
