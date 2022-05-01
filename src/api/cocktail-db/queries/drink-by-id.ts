import { generateQuery } from '../../../data';
import { Drink } from '../../../entities';

import { CocktailApiContext, fetchSingleDrink, getLookupUrl, useApiContext } from './common';

export const {
  useDataQuery: useDrinkQuery,
  useRouteMatchedDataQuery: useMatchedDrinkQuery,
  useLoader: useDrinkByIdLoader,
} = generateQuery<{ id: string }, Drink, CocktailApiContext>({
  key: 'drink',
  fetcher: ({ id }, context) => {
    const url = getLookupUrl(context.meta.token);
    url.searchParams.set('i', id);
    return fetchSingleDrink(url);
  },
  getMatchParams: (routeMatch) => (routeMatch.params.id ? { id: routeMatch.params.id } : null),
  useQueryContextMeta: useApiContext,
});
