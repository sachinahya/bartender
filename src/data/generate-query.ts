import { LoaderFn, RouteMatch, useMatch } from '@tanstack/react-location';
import { FetchQueryOptions, useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import type { Except } from 'type-fest';

import { queryClient } from './client';

type Params = unknown;

type SimpleQueryKey<K extends string = string> = K;

type ParameterizedQueryKey<P extends Params, K extends SimpleQueryKey = SimpleQueryKey> = Readonly<
  [K, P]
>;

type UseDataQueryOptions<
  K extends SimpleQueryKey | ParameterizedQueryKey<Params, SimpleQueryKey>,
  R,
> = Except<UseQueryOptions<R, Error, R, K>, 'queryKey' | 'queryFn'>;

type FetchDataOptions<
  K extends SimpleQueryKey | ParameterizedQueryKey<Params, SimpleQueryKey>,
  R,
> = FetchQueryOptions<R, Error, R, K>;

type CommonDataOptions<
  K extends SimpleQueryKey | ParameterizedQueryKey<Params, SimpleQueryKey>,
  R,
> = UseDataQueryOptions<K, R> | FetchDataOptions<K, R>;

interface CommonGenerateQueryOptions<K extends SimpleQueryKey> {
  key: K;
}

interface GenerateQueryOptionsNoParams<K extends SimpleQueryKey, R>
  extends CommonGenerateQueryOptions<K> {
  fetcher: () => Promise<R>;
  commonOptions?: CommonDataOptions<K, R>;
  loaderOptions?: FetchDataOptions<K, R>;
}

interface GenerateQueryOptionsWithParams<P extends Params, K extends SimpleQueryKey, R>
  extends CommonGenerateQueryOptions<K> {
  fetcher: (params: P) => Promise<R>;
  getMatchParams: (routeMatch: RouteMatch) => Readonly<P> | null;
  commonOptions?: CommonDataOptions<ParameterizedQueryKey<P, K>, R>;
  loaderOptions?: FetchDataOptions<ParameterizedQueryKey<P, K>, R>;
}

interface GeneratedNoParams<K extends SimpleQueryKey, R> {
  getKey: () => K;
  fetchData: () => Promise<R>;
  useDataQuery: (options?: UseDataQueryOptions<SimpleQueryKey<K>, R>) => UseQueryResult<R, Error>;
  prefetchLoader: LoaderFn;
}

interface GeneratedWithParams<P extends Params, K extends SimpleQueryKey, R> {
  getKey: (params: P) => ParameterizedQueryKey<P, K>;
  fetchData: (params: P) => Promise<R>;
  useDataQuery: (
    params: P,
    options?: UseDataQueryOptions<ParameterizedQueryKey<P, K>, R>,
  ) => UseQueryResult<R, Error>;
  useRouteMatchedDataQuery: (
    options?: UseDataQueryOptions<ParameterizedQueryKey<P, K>, R>,
  ) => UseQueryResult<R, Error>;
  prefetchLoader: LoaderFn;
}

const useDefaultQueryOptions = (prefetchLoader: LoaderFn) => {
  const { route } = useMatch();

  return {
    // Don't refetch on mount if the data was already provided by a loader.
    refetchOnMount: route.loader === prefetchLoader ? false : undefined,
  };
};

export function generateQuery<K extends SimpleQueryKey, R>(
  options: GenerateQueryOptionsNoParams<K, R>,
): GeneratedNoParams<K, R>;
export function generateQuery<P extends Params, K extends SimpleQueryKey, R>(
  options: GenerateQueryOptionsWithParams<P, K, R>,
): GeneratedWithParams<P, K, R>;
export function generateQuery<P extends Params, K extends SimpleQueryKey, R>(
  options: GenerateQueryOptionsNoParams<K, R> | GenerateQueryOptionsWithParams<P, K, R>,
): GeneratedNoParams<K, R> | GeneratedWithParams<P, K, R> {
  // Empty comment so Prettier keeps spacing.

  if ('getMatchParams' in options) {
    type Result = GeneratedWithParams<P, K, R>;
    const { key, fetcher, getMatchParams, commonOptions, loaderOptions } = options;

    const getKey = (params: P): ParameterizedQueryKey<P, K> => [key, params];

    const prefetchLoader: Result['prefetchLoader'] = async (match) => {
      const params = getMatchParams(match);

      if (params) {
        await queryClient.prefetchQuery(getKey(params), () => fetcher(params), {
          ...commonOptions,
          ...loaderOptions,
        });
      }

      return {};
    };

    const useDataQuery: Result['useDataQuery'] = (params, options) => {
      const defaultOptions = useDefaultQueryOptions(prefetchLoader);

      return useQuery(getKey(params), () => fetcher(params), {
        ...defaultOptions,
        ...commonOptions,
        ...options,
      });
    };

    const useRouteMatchedDataQuery: Result['useRouteMatchedDataQuery'] = (options) => {
      const match = useMatch();
      const params = getMatchParams(match);
      return useDataQuery(params as P, { enabled: !!params, ...options });
    };

    return {
      getKey,
      fetchData: fetcher,
      prefetchLoader,
      useDataQuery,
      useRouteMatchedDataQuery,
    };
  }

  type Result = GeneratedNoParams<K, R>;
  const { key, fetcher, commonOptions, loaderOptions } = options;

  const getKey = (): SimpleQueryKey<K> => key;

  const prefetchLoader: Result['prefetchLoader'] = async () => {
    await queryClient.prefetchQuery(getKey(), () => fetcher(), {
      ...commonOptions,
      ...loaderOptions,
    });
    return {};
  };

  const useDataQuery: Result['useDataQuery'] = (options) => {
    const defaultQueryOptions = useDefaultQueryOptions(prefetchLoader);

    return useQuery(getKey(), () => fetcher(), {
      ...defaultQueryOptions,
      ...commonOptions,
      ...options,
    });
  };

  return {
    getKey,
    fetchData: fetcher,
    prefetchLoader,
    useDataQuery,
  };
}
