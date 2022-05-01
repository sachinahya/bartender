import { generateQuery } from '../../../data';
import { Drink } from '../../../entities';

import { fetchSingleDrink, getBaseUrl } from './common';

export const { useDataQuery: useRandomDrinksQuery, prefetchLoaderFactory: randomDrinksLoader } =
  generateQuery<Drink[]>({
    key: 'randomDrinks',
    fetcher: () => {
      const url = getBaseUrl();
      url.pathname += '/random.php';

      return Promise.all(Array.from({ length: 10 }).map(() => fetchSingleDrink(url)));
    },
    commonOptions: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: Number.POSITIVE_INFINITY,
    },
  });
