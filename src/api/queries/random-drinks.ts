import { generateQuery } from '../../data';
import { Drink } from '../../entities';

import { ApiContext, useApiContext } from './context';

export const { useDataQuery: useRandomDrinksQuery, useLoader: useRandomDrinksLoader } =
  generateQuery<{ count: number }, Drink[], ApiContext>({
    key: 'randomDrinks',
    fetcher: async ({ count }, context) => context.meta.store.getRandomDrinks(count),
    getMatchParams: () => ({ count: 10 }),
    useQueryContextMeta: useApiContext,
  });
