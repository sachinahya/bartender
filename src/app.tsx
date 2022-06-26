import { Auth0Provider } from '@auth0/auth0-react';
import { Outlet, ReactLocation, Router } from '@tanstack/react-location';
import { FC, StrictMode, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { ApiClient, ApiClientProvider } from './api/client';
import { ErrorMessage } from './components/error-message';
import { LoadingView } from './components/layout';
import { useRoutes } from './routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});
const location = new ReactLocation();

const apiClient = new ApiClient();

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
      <Auth0Provider
        domain={import.meta.env.VITE_DOMAIN || ''}
        clientId={import.meta.env.VITE_CLIENT_ID || ''}
        redirectUri={window.location.origin}
        audience={import.meta.env.VITE_AUDIENCE}
        scope={import.meta.env.VITE_SCOPE}
      >
        <QueryClientProvider client={queryClient}>
          <ApiClientProvider value={apiClient}>
            <ReactQueryDevtools />
            <Routes />
          </ApiClientProvider>
        </QueryClientProvider>
      </Auth0Provider>
    </StrictMode>
  );
};
