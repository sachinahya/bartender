import { generateQuery } from '../../data';
import { Drink } from '../../entities';

import { ApiContext, useApiContext } from './context';

export const {
  getKey: getFavouriteDrinksKey,
  useDataQuery: useFavouriteDrinksQuery,
  useLoader: useFavouriteDrinksLoader,
} = generateQuery<Drink[], ApiContext>({
  key: 'favouriteDrinks',
  fetcher: (context) => context.meta.store.getAll(),
  useQueryContextMeta: useApiContext,
});
