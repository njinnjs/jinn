import { Database, MongoClient } from "https://deno.land/x/mongo@v0.29.1/mod.ts";
import type { FactoryProvider } from "jinn/core/njinn/types.ts";

const DbProvider: FactoryProvider = {
  token: Database,
  useFactory: async () => {
    const client = new MongoClient();
    await client.connect("mongodb://localhost:27017");
    return client.database("demo");
  },
};

export default DbProvider;
