import { generateQuery } from '../../../data';
import { Drink } from '../../../entities';

import { CocktailApiContext, fetchSingleDrink, getBaseUrl, useApiContext } from './common';

export const { useDataQuery: useRandomDrinksQuery, useLoader: useRandomDrinksLoader } =
  generateQuery<{ count: number }, Drink[], CocktailApiContext>({
    key: 'randomDrinks',
    fetcher: async ({ count }, context) => {
      const url = getBaseUrl(context.meta.token);
      url.pathname += '/random.php';

      return Promise.all(Array.from({ length: count }).map(() => fetchSingleDrink(url)));
    },
    getMatchParams: () => ({ count: 10 }),
    useQueryContextMeta: useApiContext,
  });
