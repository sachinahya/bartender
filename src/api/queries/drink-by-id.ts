import { generateQuery } from '../../data';
import { Drink } from '../../entities';

import { ApiContext, useApiContext } from './context';

export const {
  useDataQuery: useDrinkQuery,
  useRouteMatchedDataQuery: useMatchedDrinkQuery,
  useLoader: useDrinkByIdLoader,
} = generateQuery<{ id: string }, Drink, ApiContext>({
  key: 'drink',
  fetcher: ({ id }, context) => context.meta.store.getDrinkById(id),
  getMatchParams: (routeMatch) => (routeMatch.params.id ? { id: routeMatch.params.id } : null),
  useQueryContextMeta: useApiContext,
});
