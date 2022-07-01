import { Drink } from '../../entities';
import { fetchJson } from '../fetch-json';

import { responseToEntity } from './mapping';
import { CocktailApiResponse, DrinksResponseItem } from './response';

const token = process.env.COCKTAIL_DB_TOKEN || '';

export const getImagesUrl = (): URL => new URL('https://www.thecocktaildb.com/images');

export const getBaseUrl = (): URL => new URL(`https://www.thecocktaildb.com/api/json/v1/${token}`);

export const getLookupUrl = (): URL => {
  const url = getBaseUrl();
  url.pathname += '/lookup.php';
  return url;
};

export const getListUrl = (type: string): URL => {
  const url = getBaseUrl();
  url.pathname += '/list.php';
  url.searchParams.set(type, 'list');
  return url;
};

export const getFilterUrl = (): URL => {
  const url = getBaseUrl();
  url.pathname += '/filter.php';
  return url;
};

export const getSearchUrl = (): URL => {
  const url = getBaseUrl();
  url.pathname += '/search.php';
  return url;
};

export const fetchSingleDrink = async (url: URL): Promise<Drink> => {
  const response = await fetchJson<CocktailApiResponse<DrinksResponseItem>>(url.toString());
  const [drinkJson] = response.drinks;

  if (!drinkJson) {
    throw new Error('Unexpected response.');
  }

  return responseToEntity(drinkJson);
};

export const fetchSingleItem = async <T, R, K extends string>(
  arrayKey: K,
  url: URL,
  transformer: (item: T) => R | Promise<R>,
): Promise<R> => {
  const response = await fetchJson<CocktailApiResponse<T, K>>(url.toString());
  const [drinkJson] = response[arrayKey];

  if (!drinkJson) {
    throw new Error('Unexpected response.');
  }

  return transformer(drinkJson);
};

export const fetchList = async <T, R, K extends string = 'drinks'>(
  arrayKey: K,
  url: URL,
  transformer: (item: T) => R | Promise<R>,
): Promise<R[]> => {
  const response = await fetchJson<CocktailApiResponse<T, K>>(url.toString());
  const transformPromises = response[arrayKey].map((item) => Promise.resolve(transformer(item)));
  return Promise.all(transformPromises);
};
