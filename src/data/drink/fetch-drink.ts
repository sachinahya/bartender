import { useMutation } from 'react-query';

import { fetchJson } from '../fetch-json';
import { generateQuery } from '../generate-query';

import * as favouritesStore from './favourites-store';
import { responseToEntity } from './mapping';
import { Drink, DrinksResponse } from './types';

const TOKEN = '1';

const getBaseUrl = (token: string): URL =>
  new URL(`https://www.thecocktaildb.com/api/json/v1/${token}`);

const getLookupUrl = (token: string): URL => {
  const url = getBaseUrl(token);
  url.pathname += '/lookup.php';
  return url;
};

const fetchSingleDrink = async (url: URL): Promise<Drink> => {
  const response = await fetchJson<DrinksResponse>(url.toString());
  const [drinkJson] = response.drinks;

  if (!drinkJson) {
    throw new Error('Unexpected response.');
  }

  return responseToEntity(drinkJson);
};

// Get one random drink
export const { useDataQuery: useRandomDrinkQuery, prefetchLoader: randomDrinkLoader } =
  generateQuery<Drink>({
    key: 'randomDrink',
    fetcher: () => {
      const url = getBaseUrl(TOKEN);
      url.pathname += '/random.php';
      return fetchSingleDrink(url);
    },
    commonOptions: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  });

// Get list of random drinks
export const { useDataQuery: useRandomDrinksQuery, prefetchLoader: randomDrinksLoader } =
  generateQuery<Drink[]>({
    key: 'randomDrinks',
    fetcher: () => {
      const url = getBaseUrl(TOKEN);
      url.pathname += '/random.php';

      return Promise.all(Array.from({ length: 10 }).map(() => fetchSingleDrink(url)));
    },
    commonOptions: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: Number.POSITIVE_INFINITY,
    },
  });

// Get drink by ID
export const {
  useDataQuery: useDrinkQuery,
  useRouteMatchedDataQuery: useMatchedDrinkQuery,
  prefetchLoader: drinkByIdLoader,
} = generateQuery<{ id: string }, Drink>({
  key: 'drink',
  fetcher:
    ({ id }) =>
    () => {
      const url = getLookupUrl(TOKEN);
      url.searchParams.set('i', id);
      return fetchSingleDrink(url);
    },
  getMatchParams: (routeMatch) => (routeMatch.params.id ? { id: routeMatch.params.id } : null),
  loaderOptions: {
    staleTime: 10_000,
  },
});

export const { useDataQuery: useFavouriteDrinks, prefetchLoader: favouriteDrinksLoader } =
  generateQuery<Drink[]>({
    key: 'favouriteDrinks',
    fetcher: () => {
      return favouritesStore.getAll();
    },
  });

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- TODO: Abstract and type this properly.
export const useSaveFavouriteDrink = (): any => {
  return useMutation((newDrink: Drink) => {
    return favouritesStore.add(newDrink);
  });
};
