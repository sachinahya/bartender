import { BadRequest } from 'http-errors';
import { StatusCodes } from 'http-status-codes';

import { auth } from '../middleware/auth';
import { Handler } from '../middleware/common';
import { db } from '../middleware/db';
import { middleware } from '../middleware/middleware';

const isFavourite: Handler = async (event) => {
  const userId = event.auth?.sub || '0';
  const drinkId = event.queryStringParameters?.id;

  if (!drinkId) {
    throw new BadRequest('Must specify drink ID');
  }

  const result = await event.dbClient.favourites.findOne({ drinkId, userId });

  return {
    statusCode: StatusCodes.OK,
    body: {
      id: result?._id || null,
      data: {
        isFavourite: !!result,
      },
    },
  };
};

export const handler = middleware(isFavourite)
  .use(auth({ optional: true }))
  .use(db());
