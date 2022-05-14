import { generateQuery } from '../../../data';
import { Drink } from '../../../entities';

import { CocktailApiContext, fetchSingleDrink, getBaseUrl, useApiContext } from './common';

export const { useDataQuery: useRandomDrinksQuery, useLoader: useRandomDrinksLoader } =
  generateQuery<Drink[], CocktailApiContext>({
    key: 'randomDrinks',
    fetcher: async (context) => {
      console.log('random drinks');

      const url = getBaseUrl(context.meta.token);
      url.pathname += '/random.php';

      await new Promise((resolve) => {
        setTimeout(resolve, 4000);
      });

      return Promise.all(Array.from({ length: 10 }).map(() => fetchSingleDrink(url)));
    },
    useQueryContextMeta: useApiContext,
    commonOptions: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: Number.POSITIVE_INFINITY,
      suspense: typeof window === 'undefined',
    },
  });
