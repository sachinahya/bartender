import { generateQuery } from '../../../data';
import { Drink } from '../../../entities';

import { CocktailApiContext, fetchSingleDrink, getBaseUrl, useApiContext } from './common';

export const { useDataQuery: useRandomDrinksQuery, useLoader: useRandomDrinksLoader } =
  generateQuery<Drink[], CocktailApiContext>({
    key: 'randomDrinks',
    fetcher: (context) => {
      const url = getBaseUrl(context.meta.token);
      url.pathname += '/random.php';

      return Promise.all(Array.from({ length: 10 }).map(() => fetchSingleDrink(url)));
    },
    useQueryContextMeta: useApiContext,
    commonOptions: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: Number.POSITIVE_INFINITY,
    },
  });
