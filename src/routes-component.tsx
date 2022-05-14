import {
  createMemoryHistory,
  DefaultGenerics,
  Outlet,
  ReactLocation,
  Route,
  Router,
  RouterInstance,
  useLocation,
  useRouter,
  __Experimental__RouterSnapshot,
} from '@tanstack/react-location';
import { FC, ReactNode, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { suspend } from 'suspend-react';

import { ErrorMessage } from './components/error-message';
import { LoadingView } from './components/layout';
import { useRoutes } from './routes';

export interface RoutesProps {
  location: ReactLocation;
  isServer: boolean;
  initialUrl?: string;
}

const SSRLoader: FC<{ isServer: boolean; children: ReactNode }> = ({ isServer, children }) => {
  console.log('RENDERING SSR LOADER');
  const router = useRouter();
  const location = useLocation();

  if (!isServer) {
    return children;
  }

  if (typeof window === 'undefined') {
    suspend(async () => {
      await router.updateLocation(location.current).promise;
    }, [location.current.key]);
  }

  return children;
};

const create = async (initialUrl: string | undefined, routes: Route[]) => {
  const history = createMemoryHistory(initialUrl ? { initialEntries: [initialUrl] } : undefined);
  const location = new ReactLocation({ history });
  const router = new RouterInstance({ location, routes });
  await router.updateLocation(location.current).promise;
  return router.__experimental__createSnapshot();
};

export const Routes: FC<RoutesProps> = ({ location, isServer, initialUrl }) => {
  const routes = useRoutes();

  const snapshot = suspend(() => create(initialUrl, routes), [initialUrl, routes]);

  return (
    <>
      <script
        // eslint-disable-next-line react/no-danger -- We need it.
        dangerouslySetInnerHTML={{
          __html: `ROUTER_STATE = ${
            isServer ? "'" + JSON.stringify(snapshot) + "'" : "'" + window.ROUTER_STATE + "'"
          }`,
        }}
      />
      <Router
        __experimental__snapshot={isServer ? snapshot : JSON.parse(window.ROUTER_STATE)}
        location={location}
        routes={routes}
        defaultPendingElement={<LoadingView />}
        defaultPendingMs={1000}
        defaultPendingMinMs={500}
        defaultErrorElement={<ErrorMessage />}
      >
        {isServer ? (
          <Suspense fallback={'LoadingView'}>
            <SSRLoader isServer={isServer}>
              <Suspense fallback={'LoadingView'}>
                <Outlet />
              </Suspense>
            </SSRLoader>
          </Suspense>
        ) : (
          <Suspense fallback={'LoadingView'}>
            <Outlet />
          </Suspense>
        )}
      </Router>
    </>
  );
};
