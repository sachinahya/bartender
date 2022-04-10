import { Outlet, ReactLocation, Router } from '@tanstack/react-location';
import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { createRoutes } from './routes';

const queryClient = new QueryClient();
const location = new ReactLocation();
const routes = createRoutes(queryClient);

export const App: FC = () => (
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools />
    <Router location={location} routes={routes}>
      <Outlet />
      {/* <ReactLocationDevtools /> */}
    </Router>
  </QueryClientProvider>
);
