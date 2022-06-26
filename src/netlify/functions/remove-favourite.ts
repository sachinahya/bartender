import { BadRequest } from 'http-errors';
import { StatusCodes } from 'http-status-codes';

import { auth } from '../middleware/auth';
import { Handler } from '../middleware/common';
import { db } from '../middleware/db';
import { middleware } from '../middleware/middleware';

const removeFavourite: Handler = async (event) => {
  const userId = event.auth?.sub || '0';
  const drinkId = event.queryStringParameters?.id;

  if (!drinkId) {
    throw new BadRequest('Must specify drink ID');
  }

  await event.dbClient.favourites.deleteOne({ drinkId, userId });

  return {
    statusCode: StatusCodes.OK,
    body: {},
  };
};

export const handler = middleware(removeFavourite)
  .use(auth({ optional: true }))
  .use(db());
