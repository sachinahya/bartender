import { StatusCodes } from 'http-status-codes';

import { fetchSingleDrink, getBaseUrl } from '../cocktail-db/api';
import { Handler } from '../middleware/common';
import { middleware } from '../middleware/middleware';

const randomDrink: Handler = async () => {
  const url = getBaseUrl();
  url.pathname += '/random.php';

  const result = await fetchSingleDrink(url);

  return {
    statusCode: StatusCodes.OK,
    body: result,
  };
};

export const handler = middleware(randomDrink);
