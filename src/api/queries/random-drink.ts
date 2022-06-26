import { generateQuery } from '../../data';
import { Drink } from '../../entities';

import { ApiContext, useApiContext } from './context';

export const { useDataQuery: useRandomDrinkQuery, useLoader: useRandomDrinkLoader } = generateQuery<
  Drink,
  ApiContext
>({
  key: 'randomDrink',
  fetcher: (context) => context.meta.store.getRandomDrink(),
  useQueryContextMeta: useApiContext,
});
