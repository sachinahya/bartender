import { Outlet, ReactLocation, Router } from '@tanstack/react-location';
import { FC, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { ErrorMessage } from './components/error-message';
import { LoadingView } from './components/layout';
import { createRoutes } from './routes';

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
  </QueryClientProvider>
);
