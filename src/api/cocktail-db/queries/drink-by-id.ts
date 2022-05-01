import { generateQuery } from '../../../data';
import { Drink } from '../../../entities';

import { fetchSingleDrink, getLookupUrl } from './common';

export const {
  useDataQuery: useDrinkQuery,
  useRouteMatchedDataQuery: useMatchedDrinkQuery,
  prefetchLoaderFactory: drinkByIdLoader,
} = generateQuery<{ id: string }, Drink>({
  key: 'drink',
  fetcher: ({ id }) => {
    const url = getLookupUrl();
    url.searchParams.set('i', id);
    return fetchSingleDrink(url);
  },
  getMatchParams: (routeMatch) => (routeMatch.params.id ? { id: routeMatch.params.id } : null),
  loaderOptions: {
    staleTime: 10_000,
  },
});
