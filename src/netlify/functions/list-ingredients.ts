import { StatusCodes } from 'http-status-codes';

import { fetchList, getListUrl } from '../cocktail-db/api';
import { mapIngredientsListItem } from '../cocktail-db/mapping';
import { Handler } from '../middleware/common';
import { middleware } from '../middleware/middleware';

const listIngredients: Handler = async () => {
  const url = getListUrl('i');

  const result = await fetchList('drinks', url, mapIngredientsListItem);

  return {
    statusCode: StatusCodes.OK,
    body: result,
  };
};

export const handler = middleware(listIngredients);
