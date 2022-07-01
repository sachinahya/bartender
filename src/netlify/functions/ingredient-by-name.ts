import { BadRequest } from 'http-errors';
import { StatusCodes } from 'http-status-codes';

import { fetchSingleItem, getSearchUrl } from '../cocktail-db/api';
import { mapIngredientItem } from '../cocktail-db/mapping';
import { Handler } from '../middleware/common';
import { middleware } from '../middleware/middleware';

const ingredientByName: Handler = async (event) => {
  const ingredientName = event.queryStringParameters?.name;

  if (!ingredientName) {
    throw new BadRequest('Must specify ingredient name');
  }

  const url = getSearchUrl();
  url.searchParams.set('i', ingredientName);

  const result = await fetchSingleItem('ingredients', url, mapIngredientItem);

  return {
    statusCode: StatusCodes.OK,
    body: result,
  };
};

export const handler = middleware(ingredientByName);
