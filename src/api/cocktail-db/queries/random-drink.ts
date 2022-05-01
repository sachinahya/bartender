import { generateQuery } from '../../../data';
import { Drink } from '../../../entities';

import { fetchSingleDrink, getBaseUrl } from './common';

export const { useDataQuery: useRandomDrinkQuery, prefetchLoaderFactory: randomDrinkLoader } =
  generateQuery<Drink>({
    key: 'randomDrink',
    fetcher: () => {
      const url = getBaseUrl();
      url.pathname += '/random.php';
      return fetchSingleDrink(url);
    },
    commonOptions: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  });
