import { LoaderFn, RouteMatch, useMatch } from '@tanstack/react-location';
import {
  FetchQueryOptions,
  QueryFunctionContext,
  QueryFunctionData,
  useQuery,
  useQueryClient,
  UseQueryOptions,
  QueryObserverRefetchErrorResult,
  QueryObserverSuccessResult,
} from 'react-query';
import type { Except } from 'type-fest';

export type Params = unknown;

export type KeyId = string;

export type SimpleQueryKey = readonly [KeyId];

export type ParameterizedQueryKey<P extends Params> = readonly [KeyId, P];

export type Loader = LoaderFn;

const loaderKeyKey = Symbol();

type KeyedLoader = LoaderFn & { [loaderKeyKey]: symbol };

const combinedLoadersKey = Symbol();

type CombinedLoader = LoaderFn & { [combinedLoadersKey]: KeyedLoader[] };

export type UseQueryResult<R> =
  | QueryObserverRefetchErrorResult<R, Error>
  | QueryObserverSuccessResult<R, Error>;

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

export interface LoaderFactoryOptions {
  eager?: boolean;
}

export interface CommonGenerated {
  useLoader: (options?: LoaderFactoryOptions) => Loader;
}

export interface GeneratedNoParams<R> extends CommonGenerated {
  getKey: () => SimpleQueryKey;
  // fetchData: () => Promise<R>;
  useDataQuery: (options?: UseDataQueryOptions<SimpleQueryKey, R>) => UseQueryResult<R>;
}

export interface GeneratedWithParams<P extends Params, R> extends CommonGenerated {
  getKey: (params: P) => ParameterizedQueryKey<P>;
  // fetchData: (params: P) => Promise<R>;
  useDataQuery: (
    params: P,
    options?: UseDataQueryOptions<ParameterizedQueryKey<P>, R>,
  ) => UseQueryResult<R>;
  useRouteMatchedDataQuery: (
    options?: UseDataQueryOptions<ParameterizedQueryKey<P>, R>,
  ) => UseQueryResult<R>;
}

export const combineLoaders = (...loaders: Loader[]): CombinedLoader => {
  const combinedLoader: CombinedLoader = (async (match, opts) => {
    const promises = loaders.map((loader) => loader(match, opts));
    await Promise.all(promises);
    return {};
  }) as CombinedLoader;

  Object.assign(combinedLoader, {
    [combinedLoadersKey]: loaders,
    [loaderKeyKey]: Symbol(),
  });

  return combinedLoader;
};

const defaultContextThing = {};
const defaultContextFn = () => defaultContextThing;

const getRefetchOnMount = (
  functionKey: symbol,
  loader: Loader | CombinedLoader | undefined,
): false | undefined => {
  const ourLoader = loader as Loader | CombinedLoader;

  if (combinedLoadersKey in ourLoader) {
    const combinedLoaders = (ourLoader as CombinedLoader)[combinedLoadersKey];
    return combinedLoaders.some((loader) => loader[loaderKeyKey] === functionKey)
      ? false
      : undefined;
  }

  const singleLoader = loader as KeyedLoader;
  return singleLoader[loaderKeyKey] === functionKey ? false : undefined;
};

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

  const functionKey = Symbol();

  if ('getMatchParams' in options) {
    type Result = GeneratedWithParams<P, R>;
    const { key, fetcher, getMatchParams, commonOptions, loaderOptions } = options;

    const getKey: Result['getKey'] = (params) => [key, params];

    const useLoader: Result['useLoader'] = ({ eager } = {}) => {
      const queryClient = useQueryClient();
      const meta = useQueryContextMeta();

      const loader: Loader = async (match) => {
        const params = getMatchParams(match);

        if (!params) {
          return {};
        }

        const promise = queryClient.prefetchQuery(
          getKey(params),
          (context) => fetcher(params, context as never),
          {
            ...commonOptions,
            ...loaderOptions,
            meta,
          },
        );

        if (!eager) {
          await promise;
        }

        return {};
      };

      (loader as KeyedLoader)[loaderKeyKey] = functionKey;

      return loader;
    };

    const useDataQuery: Result['useDataQuery'] = (params, options) => {
      const meta = useQueryContextMeta();
      const { route } = useMatch();

      return useQuery(getKey(params), (context) => fetcher(params, context as never), {
        refetchOnMount: getRefetchOnMount(functionKey, route.loader),
        ...commonOptions,
        ...options,
        meta,
      }) as UseQueryResult<R>;
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

  const useLoader: Result['useLoader'] = ({ eager } = {}) => {
    const queryClient = useQueryClient();
    const meta = useQueryContextMeta();

    const loader: Loader = async () => {
      const promise = queryClient.prefetchQuery(getKey(), (context) => fetcher(context as never), {
        ...commonOptions,
        ...loaderOptions,
        meta,
      });

      if (!eager) {
        await promise;
      }

      return {};
    };

    (loader as KeyedLoader)[loaderKeyKey] = functionKey;

    return loader;
  };

  const useDataQuery: Result['useDataQuery'] = (options) => {
    const meta = useQueryContextMeta();
    const { route } = useMatch();

    return useQuery(getKey(), (context) => fetcher(context as never), {
      refetchOnMount: getRefetchOnMount(functionKey, route.loader),
      ...commonOptions,
      ...options,
      meta,
    }) as UseQueryResult<R>;
  };

  return {
    getKey,
    useLoader,
    useDataQuery,
  };
}
