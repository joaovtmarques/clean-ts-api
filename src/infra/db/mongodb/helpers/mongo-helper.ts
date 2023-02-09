import { Collection, ConnectOptions, MongoClient } from 'mongodb';

export const MongoHelper = {
  client: null as unknown as MongoClient,

  async connect(uri: string): Promise<void> {
    this.client = await MongoClient.connect(process.env.MONGO_URL || '', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
  },

  async disconnect() {
    await this.client.close();
  },

  getCollection(name: string): Collection {
    return this.client.db().collection(name);
  },

  getClient(): MongoClient {
    return this.client;
  },

  map: (collection: any): any => {
    const { _id, ...rest } = collection;

    return { id: _id.toHexString(), ...rest };
  },
};
