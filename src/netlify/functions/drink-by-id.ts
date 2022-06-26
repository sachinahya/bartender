import { BadRequest } from 'http-errors';
import { StatusCodes } from 'http-status-codes';

import { fetchSingleDrink, getLookupUrl } from '../cocktail-db/api';
import { Handler } from '../middleware/common';
import { middleware } from '../middleware/middleware';

const drinkById: Handler = async (event) => {
  const drinkId = event.queryStringParameters?.id;

  if (!drinkId) {
    throw new BadRequest('Must specify drink ID');
  }

  const url = getLookupUrl();
  url.searchParams.set('i', drinkId);

  const result = await fetchSingleDrink(url);

  return {
    statusCode: StatusCodes.OK,
    body: result,
  };
};

export const handler = middleware(drinkById);
