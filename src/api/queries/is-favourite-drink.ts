import { generateQuery } from '../../data';

import { ApiContext, useApiContext } from './context';

export const {
  getKey: getIsFavouriteDrinkKey,
  useDataQuery: useIsFavouriteDrinkQuery,
  useRouteMatchedDataQuery: useIsMatchedFavouriteDrinkQuery,
} = generateQuery<{ id: string }, boolean, ApiContext>({
  key: 'favouriteDrink',
  fetcher: ({ id }, context) => context.meta.store.isFavourite(id),
  getMatchParams: (routeMatch) => (routeMatch.params.id ? { id: routeMatch.params.id } : null),
  useQueryContextMeta: useApiContext,
});
