import { LoaderFn, RouteMatch, useMatch } from '@tanstack/react-location';
import {
  FetchQueryOptions,
  QueryFunctionContext,
  QueryFunctionData,
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

export interface CommonGenerateQueryOptions<C> {
  key: KeyId;
  useQueryContextMeta?: () => C;
}

export interface GenerateQueryOptionsNoParams<R, C> extends CommonGenerateQueryOptions<C> {
  fetcher: (
    context: QueryFunctionContext<SimpleQueryKey> & { meta: C },
  ) => Promise<QueryFunctionData<R>>;
  commonOptions?: CommonDataOptions<SimpleQueryKey, R>;
  loaderOptions?: FetchDataOptions<SimpleQueryKey, R>;
}

export interface GenerateQueryOptionsWithParams<P extends Params, R, C>
  extends CommonGenerateQueryOptions<C> {
  fetcher: (
    params: P,
    context: QueryFunctionContext<ParameterizedQueryKey<P>> & { meta: C },
  ) => Promise<QueryFunctionData<R>>;
  getMatchParams: (routeMatch: RouteMatch) => Readonly<P> | null;
  commonOptions?: CommonDataOptions<ParameterizedQueryKey<P>, R>;
  loaderOptions?: FetchDataOptions<ParameterizedQueryKey<P>, R>;
}

export interface GeneratedNoParams<R> {
  getKey: () => SimpleQueryKey;
  // fetchData: () => Promise<R>;
  useDataQuery: (options?: UseDataQueryOptions<SimpleQueryKey, R>) => UseQueryResult<R, Error>;
  useLoader: () => LoaderFn;
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
  useLoader: () => LoaderFn;
}

const defaultContextThing = {};
const defaultContextFn = () => defaultContextThing;

export function generateQuery<R, C>(
  options: GenerateQueryOptionsNoParams<R, C>,
): GeneratedNoParams<R>;
export function generateQuery<P extends Params, R, C>(
  options: GenerateQueryOptionsWithParams<P, R, C>,
): GeneratedWithParams<P, R>;
export function generateQuery<P extends Params, R, C>(
  options: GenerateQueryOptionsNoParams<R, C> | GenerateQueryOptionsWithParams<P, R, C>,
): GeneratedNoParams<R> | GeneratedWithParams<P, R> {
  // Empty comment so Prettier keeps spacing.

  const useQueryContextMeta = options.useQueryContextMeta || defaultContextFn;

  if ('getMatchParams' in options) {
    type Result = GeneratedWithParams<P, R>;
    const { key, fetcher, getMatchParams, commonOptions, loaderOptions } = options;

    const getKey: Result['getKey'] = (params) => [key, params];

    const useLoader: Result['useLoader'] = () => {
      const queryClient = useQueryClient();
      const meta = useQueryContextMeta();

      return async (match) => {
        const params = getMatchParams(match);

        if (params) {
          await queryClient.prefetchQuery(
            getKey(params),
            (context) => fetcher(params, context as never),
            {
              ...commonOptions,
              ...loaderOptions,
              meta,
            },
          );
        }

        return {};
      };
    };

    const useDataQuery: Result['useDataQuery'] = (params, options) => {
      const meta = useQueryContextMeta();

      return useQuery(getKey(params), (context) => fetcher(params, context as never), {
        ...commonOptions,
        ...options,
        meta,
      });
    };

    const useRouteMatchedDataQuery: Result['useRouteMatchedDataQuery'] = (options) => {
      const match = useMatch();
      const params = getMatchParams(match);
      return useDataQuery(params as P, { enabled: !!params, ...options });
    };

    return {
      getKey,
      useLoader,
      useDataQuery,
      useRouteMatchedDataQuery,
    };
  }

  type Result = GeneratedNoParams<R>;
  const { key, fetcher, commonOptions, loaderOptions } = options;

  const getKey: Result['getKey'] = () => [key];

  const useLoader: Result['useLoader'] = () => {
    const queryClient = useQueryClient();
    const meta = useQueryContextMeta();

    return async () => {
      await queryClient.prefetchQuery(getKey(), (context) => fetcher(context as never), {
        ...commonOptions,
        ...loaderOptions,
        meta,
      });

      return {};
    };
  };

  const useDataQuery: Result['useDataQuery'] = (options) => {
    const meta = useQueryContextMeta();

    return useQuery(getKey(), (context) => fetcher(context as never), {
      ...commonOptions,
      ...options,
      meta,
    });
  };

  return {
    getKey,
    useLoader,
    useDataQuery,
  };
}
