import { BadRequest } from 'http-errors';
import { StatusCodes } from 'http-status-codes';

import { auth } from '../middleware/auth';
import { Handler } from '../middleware/common';
import { db } from '../middleware/db';
import { middleware } from '../middleware/middleware';

const addFavourite: Handler = async (event) => {
  const userId = event.auth?.sub || '0';
  const drinkId = event.queryStringParameters?.id;

  if (!drinkId) {
    throw new BadRequest('Must specify drink ID');
  }

  const result = await event.dbClient.favourites.insertOne({
    userId,
    drinkId,
  });

  return {
    statusCode: StatusCodes.CREATED,
    body: {
      id: result.insertedId,
      data: {
        drinkId,
      },
    },
  };
};

export const handler = middleware(addFavourite)
  .use(auth({ optional: true }))
  .use(db());
