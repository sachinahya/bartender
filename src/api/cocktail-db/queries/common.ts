import { fetchJson } from '../../../data';
import { Drink } from '../../../entities';
import { responseToEntity } from '../mapping';
import { DrinksResponse } from '../response';

// TODO: Make this injected via context somehow.
const TOKEN = '1';

export const getBaseUrl = (): URL => new URL(`https://www.thecocktaildb.com/api/json/v1/${TOKEN}`);

export const getLookupUrl = (): URL => {
  const url = getBaseUrl();
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
