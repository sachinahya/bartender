import { Collection, MongoClient, ServerApiVersion } from 'mongodb';

export interface DbClient {
  favourites: Collection<{ userId: string; drinkId: string }>;
}

export interface DbClientAdmin extends DbClient {
  connect: () => Promise<void>;
}

export const createMongoClient = (): DbClientAdmin => {
  const client = new MongoClient(process.env.FN_MONGODB_URL || '', {
    serverApi: ServerApiVersion.v1,
  });

  const favourites = client
    .db(process.env.FN_MONGODB_COLLECTION)
    .collection<{ userId: string; drinkId: string }>('favourites');

  return {
    connect: () =>
      client.connect().then(() => {
        //
      }),
    favourites,
  };
};
