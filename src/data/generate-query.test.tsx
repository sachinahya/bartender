import {
  createMemoryHistory,
  LoaderFnOptions,
  ReactLocation,
  Route,
  RouteMatch,
  Router,
} from '@tanstack/react-location';
import { render, renderHook, screen } from '@testing-library/react';
import { mock } from 'jest-mock-extended';
import { FC, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { delay } from '../utils';

import { combineLoaders, generateQuery, Loader } from './generate-query';

describe('getKey', () => {
  it('retrieves a simple key', () => {
    const { getKey } = generateQuery({
      key: 'key',
      fetcher: jest.fn().mockResolvedValue(null),
    });

    expect(getKey()).toEqual(['key']);
  });

  it('retrieves a parametrised key', () => {
    const { getKey } = generateQuery({
      key: 'key',
      fetcher: jest.fn((id: string) => Promise.resolve(id)),
      getMatchParams: () => null,
    });

    expect(getKey('test')).toEqual(['key', 'test']);
  });
});

const key = 'key';

describe('loader', () => {
  const buildQueryClient = () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }: { children?: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    return { wrapper, queryClient };
  };

  it('returns a loader function that prefetches a query', async () => {
    const { wrapper, queryClient } = buildQueryClient();
    const prefetchQuerySpy = jest.spyOn(queryClient, 'prefetchQuery');

    const fetcher = jest.fn().mockResolvedValue(null);

    const { useLoader } = generateQuery({
      key,
      fetcher,
    });

    const match = mock<RouteMatch>();
    const options = mock<LoaderFnOptions>();

    const { result } = renderHook(() => useLoader(), { wrapper });
    const loaderResult = await result.current(match, options);

    expect(loaderResult).toEqual({});
    expect(fetcher).toHaveBeenCalledOnce();
    expect(prefetchQuerySpy).toHaveBeenCalledOnce();
    expect(prefetchQuerySpy).toHaveBeenCalledWith([key], expect.toBeFunction(), { meta: {} });
  });

  it('calls getMatchParams to obtain fetcher params from the route', async () => {
    const { wrapper } = buildQueryClient();

    const fetcher = jest.fn<Promise<null>, [{ id: string }]>().mockResolvedValue(null);
    const getMatchParams = jest.fn((match: RouteMatch) => ({ id: match.params.id || '' }));

    const { useLoader } = generateQuery({
      key,
      fetcher,
      getMatchParams,
    });

    const match = mock<RouteMatch>({
      params: {
        id: 'some-id',
      },
    });
    const options = mock<LoaderFnOptions>();

    const { result } = renderHook(() => useLoader(), { wrapper });
    await result.current(match, options);

    expect(getMatchParams).toHaveBeenCalledOnce();
    expect(getMatchParams).toHaveBeenCalledWith(match);
    expect(fetcher).toHaveBeenCalledOnce();
    expect(fetcher).toHaveBeenCalledWith({ id: 'some-id' }, expect.anything());
  });

  it('calls useQueryContextMeta to pass query context to the fetcher fn', async () => {
    const { wrapper } = buildQueryClient();

    const fetcher = jest.fn().mockResolvedValue(null);
    const useQueryContextMeta = jest.fn(() => ({ test: 'value' }));

    const { useLoader } = generateQuery({
      key,
      fetcher,
      useQueryContextMeta,
    });

    const match = mock<RouteMatch>();
    const options = mock<LoaderFnOptions>();

    const { result } = renderHook(() => useLoader(), { wrapper });
    await result.current(match, options);

    expect(useQueryContextMeta).toHaveBeenCalledOnce();
    expect(fetcher).toHaveBeenCalledOnce();
    expect(fetcher).toHaveBeenCalledWith(
      expect.objectContaining({
        meta: { test: 'value' },
      }),
    );
  });

  describe('eager option', () => {
    const promiseState = (
      promise: Promise<unknown>,
    ): Promise<'pending' | 'fulfilled' | 'rejected'> => {
      const t = {};
      return Promise.race([promise, t]).then(
        (result) => (result === t ? 'pending' : 'fulfilled'),
        () => 'rejected',
      );
    };

    it('awaits the prefetch promise when eager is false', async () => {
      const { wrapper } = buildQueryClient();

      const promise = delay(1000).then(() => null);
      const fetcher = jest.fn(() => promise);

      const { useLoader } = generateQuery({
        key,
        fetcher,
      });

      const match = mock<RouteMatch>();
      const options = mock<LoaderFnOptions>();

      const { result } = renderHook(() => useLoader({ eager: false }), { wrapper });
      await result.current(match, options);

      await expect(promiseState(promise)).resolves.toBe('fulfilled');
    });

    it('does not await the prefetch promise when eager is true', async () => {
      const { wrapper } = buildQueryClient();

      const promise = delay(1000).then(() => null);
      const fetcher = jest.fn(() => promise);

      const { useLoader } = generateQuery({
        key,
        fetcher,
      });

      const match = mock<RouteMatch>();
      const options = mock<LoaderFnOptions>();

      const { result } = renderHook(() => useLoader({ eager: true }), { wrapper });
      await result.current(match, options);

      await expect(promiseState(promise)).resolves.toBe('pending');
    });
  });
});

describe('refetchOnMount', () => {
  const createMockQueryClient = () => {
    const queryClient = new QueryClient();
    const MockQueryClient: FC<{ children?: ReactNode }> = ({ children }) => {
      return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
    };
    return MockQueryClient;
  };

  const createMockRoutes = ({
    useDataQuery,
    useLoader,
  }: {
    useDataQuery: () => void;
    useLoader: () => Loader;
  }) => {
    const MockApp: FC = () => {
      useDataQuery();
      return <div>Route has mounted</div>;
    };

    const location = new ReactLocation({
      history: createMemoryHistory({ initialEntries: ['/'] }),
    });
    const MockRoutes: FC<{ children?: ReactNode }> = ({ children }) => {
      const routes: Route[] = [
        {
          path: '/',
          // eslint-disable-next-line @typescript-eslint/require-await, react/no-unstable-nested-components -- Defined in a test.
          element: async () => <MockApp />,
          loader: useLoader(),
        },
      ];

      return (
        <Router location={location} routes={routes}>
          {children}
        </Router>
      );
    };

    return MockRoutes;
  };

  it('skips fetch on mount when useDataQuery is called after a loader', async () => {
    const fetcher = jest.fn().mockResolvedValue(null);

    const generated = generateQuery({
      key,
      fetcher,
    });

    const useDataQuerySpy = jest.spyOn(generated, 'useDataQuery');
    const useLoaderSpy = jest.spyOn(generated, 'useLoader');

    const MockQueryClient = createMockQueryClient();
    const MockRoutes = createMockRoutes({
      useDataQuery: generated.useDataQuery,
      useLoader: generated.useLoader,
    });

    render(
      <MockQueryClient>
        <MockRoutes />
      </MockQueryClient>,
    );

    await screen.findByText('Route has mounted');

    expect(useDataQuerySpy).toHaveBeenCalled();
    expect(useLoaderSpy).toHaveBeenCalled();
    expect(fetcher).toHaveBeenCalledOnce();
  });

  it('skips fetch on mount when useRouteMatchedDataQuery is called after a loader and params are matched', async () => {
    const fetcher = jest.fn<Promise<null>, [{ id: string }]>().mockResolvedValue(null);

    const generated = generateQuery({
      key,
      fetcher,
      getMatchParams: () => ({ id: 'some-id' }),
    });

    const useRouteMatchedDataQuery = jest.spyOn(generated, 'useRouteMatchedDataQuery');
    const useLoaderSpy = jest.spyOn(generated, 'useLoader');

    const MockQueryClient = createMockQueryClient();
    const MockRoutes = createMockRoutes({
      useDataQuery: generated.useRouteMatchedDataQuery,
      useLoader: generated.useLoader,
    });

    render(
      <MockQueryClient>
        <MockRoutes />
      </MockQueryClient>,
    );

    await screen.findByText('Route has mounted');

    expect(useRouteMatchedDataQuery).toHaveBeenCalled();
    expect(useLoaderSpy).toHaveBeenCalled();
    expect(fetcher).toHaveBeenCalledOnce();
  });

  it('skips fetch on mount when using combined loaders', async () => {
    const fetcher1 = jest.fn().mockResolvedValue(null);
    const fetcher2 = jest.fn().mockResolvedValue(null);

    const generated1 = generateQuery({
      key: 'key1',
      fetcher: fetcher1,
    });

    const generated2 = generateQuery({
      key: 'key2',
      fetcher: fetcher2,
    });

    const useDataQuerySpy1 = jest.spyOn(generated1, 'useDataQuery');
    const useLoaderSpy1 = jest.spyOn(generated1, 'useLoader');

    const useDataQuerySpy2 = jest.spyOn(generated1, 'useDataQuery');
    const useLoaderSpy2 = jest.spyOn(generated1, 'useLoader');

    const MockQueryClient = createMockQueryClient();
    const MockRoutes = createMockRoutes({
      useDataQuery: () => {
        generated1.useDataQuery();
        generated2.useDataQuery();
      },
      useLoader: () => combineLoaders(generated1.useLoader(), generated2.useLoader()),
    });

    render(
      <MockQueryClient>
        <MockRoutes />
      </MockQueryClient>,
    );

    await screen.findByText('Route has mounted');

    expect(useDataQuerySpy1).toHaveBeenCalled();
    expect(useLoaderSpy1).toHaveBeenCalled();
    expect(fetcher1).toHaveBeenCalledOnce();

    expect(useDataQuerySpy2).toHaveBeenCalled();
    expect(useLoaderSpy2).toHaveBeenCalled();
    expect(fetcher2).toHaveBeenCalledOnce();
  });
});
