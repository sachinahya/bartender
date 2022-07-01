import { BadRequest } from 'http-errors';
import { StatusCodes } from 'http-status-codes';

import { DrinkListItem } from '../../entities';
import { fetchList, getFilterUrl } from '../cocktail-db/api';
import { DrinksResponseListItem } from '../cocktail-db/response';
import { getPalette } from '../get-palette';
import { Handler } from '../middleware/common';
import { middleware } from '../middleware/middleware';

const drinksByIngredient: Handler = async (event) => {
  const ingredientName = event.queryStringParameters?.ingredientName;

  if (!ingredientName) {
    throw new BadRequest('Must specify ingredient name');
  }

  const url = getFilterUrl();
  url.searchParams.set('i', ingredientName);

  const result = await fetchList(
    'drinks',
    url,
    async (item: DrinksResponseListItem): Promise<DrinkListItem> => {
      return {
        id: item.idDrink,
        name: item.strDrink,
        image: item.strDrinkThumb,
        palette: await getPalette(item.strDrinkThumb),
      };
    },
  );

  return {
    statusCode: StatusCodes.OK,
    body: result,
  };
};

export const handler = middleware(drinksByIngredient);
