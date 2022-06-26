import { StatusCodes } from 'http-status-codes';

import { fetchSingleDrink, getBaseUrl } from '../cocktail-db/api';
import { Handler } from '../middleware/common';
import { middleware } from '../middleware/middleware';

const randomDrinks: Handler = async (event) => {
  const url = getBaseUrl();
  url.pathname += '/random.php';

  const countQuery = event.queryStringParameters?.count;
  const count = countQuery ? Number.parseInt(countQuery) : 10;

  const result = await Promise.all(Array.from({ length: count }).map(() => fetchSingleDrink(url)));

  return {
    statusCode: StatusCodes.OK,
    body: result,
  };
};

export const handler = middleware(randomDrinks);
