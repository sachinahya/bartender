import middy from '@middy/core';
import doNotWaitForEmptyEventLoop from '@middy/do-not-wait-for-empty-event-loop';
import errorHandler from '@middy/http-error-handler';
import httpResponseSerializer from '@middy/http-response-serializer';

import { Handler, MiddlewareHandler } from './common';
import { cors } from './cors';

export const middleware = (handler: Handler): MiddlewareHandler => {
  return middy(handler as never)
    .use(doNotWaitForEmptyEventLoop())
    .use(errorHandler())
    .use(
      cors({
        credentials: true,
        origin: process.env.FN_CORS_ORIGIN,
        headers: process.env.FN_CORS_HEADERS,
      }),
    )
    .use(
      httpResponseSerializer({
        defaultContentType: 'application/json',
        serializers: [
          {
            regex: /^application\/json$/,
            serializer: ({ body }) => JSON.stringify(body),
          },
        ],
      }),
    ) as never;
};
