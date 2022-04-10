import { LoaderFn, RouteMatch, useMatch } from '@tanstack/react-location';
import memoizeOne from 'memoize-one';
import {
  FetchQueryOptions,
  QueryClient,
  QueryFunction,
  useQuery,
  useQueryClient,
  UseQueryOptions,
  UseQueryResult,
} from 'react-query';
import type { Except } from 'type-fest';

export type Params = unknown;

export type KeyId = string;

export type SimpleQueryKey = readonly [KeyId];

export type ParameterizedQueryKey<P extends Params> = readonly [KeyId, P];

export type UseDataQueryOptions<
  K extends SimpleQueryKey | ParameterizedQueryKey<Params>,
  R,
> = Except<UseQueryOptions<R, Error, R, K>, 'queryKey' | 'queryFn'>;

export type FetchDataOptions<
  K extends SimpleQueryKey | ParameterizedQueryKey<Params>,
  R,
> = FetchQueryOptions<R, Error, R, K>;

export type CommonDataOptions<K extends SimpleQueryKey | ParameterizedQueryKey<Params>, R> =
  | UseDataQueryOptions<K, R>
  | FetchDataOptions<K, R>;

export interface CommonGenerateQueryOptions {
  key: KeyId;
}

export interface GenerateQueryOptionsNoParams<R> extends CommonGenerateQueryOptions {
  fetcher: QueryFunction<R, SimpleQueryKey>;
  commonOptions?: CommonDataOptions<SimpleQueryKey, R>;
  loaderOptions?: FetchDataOptions<SimpleQueryKey, R>;
}

export interface GenerateQueryOptionsWithParams<P extends Params, R>
  extends CommonGenerateQueryOptions {
  fetcher: (params: P) => QueryFunction<R, ParameterizedQueryKey<P>>;
  getMatchParams: (routeMatch: RouteMatch) => Readonly<P> | null;
  commonOptions?: CommonDataOptions<ParameterizedQueryKey<P>, R>;
  loaderOptions?: FetchDataOptions<ParameterizedQueryKey<P>, R>;
}

export interface GeneratedNoParams<R> {
  getKey: () => SimpleQueryKey;
  // fetchData: () => Promise<R>;
  useDataQuery: (options?: UseDataQueryOptions<SimpleQueryKey, R>) => UseQueryResult<R, Error>;
  prefetchLoaderFactory: (queryClient: QueryClient) => LoaderFn;
}

export interface GeneratedWithParams<P extends Params, R> {
  getKey: (params: P) => ParameterizedQueryKey<P>;
  // fetchData: (params: P) => Promise<R>;
  useDataQuery: (
    params: P,
    options?: UseDataQueryOptions<ParameterizedQueryKey<P>, R>,
  ) => UseQueryResult<R, Error>;
  useRouteMatchedDataQuery: (
    options?: UseDataQueryOptions<ParameterizedQueryKey<P>, R>,
  ) => UseQueryResult<R, Error>;
  prefetchLoaderFactory: (queryClient: QueryClient) => LoaderFn;
}

const useDefaultQueryOptions = (prefetchLoaderFactory: (queryClient: QueryClient) => LoaderFn) => {
  const queryClient = useQueryClient();
  const { route } = useMatch();

  return {
    // Don't refetch on mount if the data was already provided by a loader.
    // The prefetchLoaderFactory's return needs to be memoized for this equality check to work.
    refetchOnMount: route.loader === prefetchLoaderFactory(queryClient) ? false : undefined,
  };
};

export function generateQuery<R>(options: GenerateQueryOptionsNoParams<R>): GeneratedNoParams<R>;
export function generateQuery<P extends Params, R>(
  options: GenerateQueryOptionsWithParams<P, R>,
): GeneratedWithParams<P, R>;
export function generateQuery<P extends Params, R>(
  options: GenerateQueryOptionsNoParams<R> | GenerateQueryOptionsWithParams<P, R>,
): GeneratedNoParams<R> | GeneratedWithParams<P, R> {
  // Empty comment so Prettier keeps spacing.

  if ('getMatchParams' in options) {
    type Result = GeneratedWithParams<P, R>;
    const { key, fetcher, getMatchParams, commonOptions, loaderOptions } = options;

    const getKey: Result['getKey'] = (params) => [key, params];

    const prefetchLoaderFactory = memoizeOne<Result['prefetchLoaderFactory']>(
      (queryClient) => async (match) => {
        const params = getMatchParams(match);

        if (params) {
          await queryClient.prefetchQuery(getKey(params), fetcher(params), {
            ...commonOptions,
            ...loaderOptions,
          });
        }

        return {};
      },
    );

    const useDataQuery: Result['useDataQuery'] = (params, options) => {
      const defaultOptions = useDefaultQueryOptions(prefetchLoaderFactory);

      return useQuery(getKey(params), fetcher(params), {
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
      prefetchLoaderFactory,
      useDataQuery,
      useRouteMatchedDataQuery,
    };
  }

  type Result = GeneratedNoParams<R>;
  const { key, fetcher, commonOptions, loaderOptions } = options;

  const getKey: Result['getKey'] = () => [key];

  const prefetchLoaderFactory = memoizeOne<Result['prefetchLoaderFactory']>(
    (queryClient) => async () => {
      await queryClient.prefetchQuery(getKey(), fetcher, {
        ...commonOptions,
        ...loaderOptions,
      });
      return {};
    },
  );

  const useDataQuery: Result['useDataQuery'] = (options) => {
    const defaultQueryOptions = useDefaultQueryOptions(prefetchLoaderFactory);

    return useQuery(getKey(), fetcher, {
      ...defaultQueryOptions,
      ...commonOptions,
      ...options,
    });
  };

  return {
    getKey,
    prefetchLoaderFactory,
    useDataQuery,
  };
}
