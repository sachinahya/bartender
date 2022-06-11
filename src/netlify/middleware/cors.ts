import { Middleware } from './common';

export interface CorsOptions {
  credentials?: boolean;
  origin?: string | string[];
  headers?: string | string[];
}

export const cors = (options: CorsOptions): Middleware => {
  const headers: Record<string, string> = {};

  if (options.credentials) {
    headers['Access-Control-Allow-Credentials'] = 'true';
  }

  if (options.origin) {
    headers['Access-Control-Allow-Origin'] = Array.isArray(options.origin)
      ? options.origin.join(', ')
      : options.origin;
  }

  if (options.headers) {
    headers['Access-Control-Allow-Headers'] = Array.isArray(options.headers)
      ? options.headers.join(', ')
      : options.headers;
  }

  return {
    before: ({ event }) => {
      if (event.httpMethod.toUpperCase() === 'OPTIONS') {
        return {
          headers,
          statusCode: 200,
        };
      }
    },
    after: ({ response }) => {
      if (response) {
        response.headers = {
          ...response.headers,
          ...headers,
        };
      }
    },
  };
};
