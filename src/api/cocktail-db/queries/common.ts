import { fetchJson } from '../../../data';
import { Drink } from '../../../entities';
import { responseToEntity } from '../mapping';
import { DrinksResponse } from '../response';

export const getBaseUrl = (token: string): URL =>
  new URL(`https://www.thecocktaildb.com/api/json/v1/${token}`);

export const getLookupUrl = (token: string): URL => {
  const url = getBaseUrl(token);
  url.pathname += '/lookup.php';
  return url;
};

export const fetchSingleDrink = async (url: URL): Promise<Drink> => {
  const response = await fetchJson<DrinksResponse>(url.toString());
  const [drinkJson] = response.drinks;

  if (!drinkJson) {
    throw new Error('Unexpected response.');
  }

  return responseToEntity(drinkJson);
};

export interface CocktailApiContext {
  token: string;
}

export const useApiContext = (): CocktailApiContext => {
  return { token: '1' };
};
