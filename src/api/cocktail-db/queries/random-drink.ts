import { generateQuery } from '../../../data';
import { Drink } from '../../../entities';

import { CocktailApiContext, fetchSingleDrink, getBaseUrl, useApiContext } from './common';

export const { useDataQuery: useRandomDrinkQuery, useLoader: useRandomDrinkLoader } = generateQuery<
  Drink,
  CocktailApiContext
>({
  key: 'randomDrink',
  fetcher: (context) => {
    const url = getBaseUrl(context.meta.token);
    url.pathname += '/random.php';
    return fetchSingleDrink(url);
  },
  useQueryContextMeta: useApiContext,
  commonOptions: {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  },
});
