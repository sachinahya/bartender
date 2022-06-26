import { InternalServerError } from 'http-errors';

import { createMongoClient, DbClientAdmin } from '../db/client';

import { Middleware } from './common';

let client: DbClientAdmin;

export const db = (): Middleware => ({
  before: async ({ event }) => {
    try {
      if (!client) {
        client = createMongoClient();
        await client.connect();
      }

      event.dbClient = client;
    } catch (error) {
      // eslint-disable-next-line no-console -- Captured by Netlify logs.
      console.error(error);
      throw new InternalServerError('Database error');
    }
  },
});
