import 'modern-normalize';
import './global.css';

// Can be removed when this PR is released.
// https://github.com/TanStack/react-location/pull/236
import 'regenerator-runtime';

import { hydrateRoot } from 'react-dom/client';

import { App } from './app';
import { ReactLocation } from '@tanstack/react-location';
import { QueryClient } from 'react-query';

const location = new ReactLocation();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

const dehydratedState = window.__REACT_QUERY_STATE__;

hydrateRoot(
  document,
  <App
    location={location}
    transformation={window.__TRANSFORMATION__.replaceAll('<\\/script>', '</script>')}
    isServer={false}
    queryClient={queryClient}
    queryState={dehydratedState}
  />,
);
