import { StatusCodes } from 'http-status-codes';

import { auth } from '../middleware/auth';
import { Handler } from '../middleware/common';
import { db } from '../middleware/db';
import { middleware } from '../middleware/middleware';

const getFavourites: Handler = async (event) => {
  const userId = event.auth?.sub || '0';

  const cursor = event.dbClient.favourites.find({ userId });
  const result = await cursor.toArray();

  return {
    statusCode: StatusCodes.OK,
    body: {
      data: {
        items: result,
      },
    },
  };
};

export const handler = middleware(getFavourites)
  .use(auth({ optional: true }))
  .use(db());
