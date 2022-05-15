import { fetchJson } from '../../../data';
import { Drink } from '../../../entities';
import { responseToEntity } from '../mapping';
import { CocktailApiResponse, DrinksResponseItem } from '../response';

export const getImagesUrl = (): URL => new URL('https://www.thecocktaildb.com/images');

export const getBaseUrl = (token: string): URL =>
  new URL(`https://www.thecocktaildb.com/api/json/v1/${token}`);

export const getLookupUrl = (token: string): URL => {
  const url = getBaseUrl(token);
  url.pathname += '/lookup.php';
  return url;
};

export const getListUrl = (token: string, type: string): URL => {
  const url = getBaseUrl(token);
  url.pathname += '/list.php';
  url.searchParams.set(type, 'list');
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

export const fetchList = async <T, R>(
  url: URL,
  transformer: (item: T) => R | Promise<R>,
): Promise<R[]> => {
  const response = await fetchJson<CocktailApiResponse<T>>(url.toString());
  const transformPromises = response.drinks.map((item) => Promise.resolve(transformer(item)));
  return Promise.all(transformPromises);
};

export interface CocktailApiContext {
  token: string;
}

export const useApiContext = (): CocktailApiContext => {
  return { token: '1' };
};
