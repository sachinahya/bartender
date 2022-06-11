import middy from '@middy/core';
import errorHandler from '@middy/http-error-handler';

import { authMiddleware } from '../../middleware/auth';
import { Handler } from '../../middleware/common';
import { cors } from '../../middleware/cors';

const businessLogic: Handler = (event) => {
  const name = event.auth;

  return Promise.resolve({
    statusCode: 200,
    body: JSON.stringify({
      payload: name,
    }),
  });
};

export const handler = middy(businessLogic as never)
  .use([
    cors({
      credentials: true,
      origin: process.env.FN_CORS_ORIGIN,
      headers: process.env.FN_CORS_HEADERS,
    }),
  ])
  .use(authMiddleware())
  .use(errorHandler());
