import { Database, MongoClient } from "https://deno.land/x/mongo@v0.29.1/mod.ts";
import type { FactoryProvider } from "jinn/core/types/njinn.ts";
import { Scopes } from "../../../packages/core/njinn/decorators.ts";

const DbProvider: FactoryProvider<Database> = {
  token: Database,
  scope: Scopes.Default,
  useFactory: async () => {
    const client = new MongoClient();
    await client.connect("mongodb://localhost:27017");
    return client.database("demo");
  },
};

export default DbProvider;
