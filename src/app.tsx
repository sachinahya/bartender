import { Outlet, Router } from '@tanstack/react-location';
import { FC } from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { location, queryClient } from './data/client';
import { routes } from './routes';

export const App: FC = () => (
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools />
    <Router location={location} routes={routes}>
      <Outlet />
      {/* <ReactLocationDevtools /> */}
    </Router>
  </QueryClientProvider>
);
