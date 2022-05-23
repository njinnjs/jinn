import { Database, MongoClient } from "https://deno.land/x/mongo@v0.29.1/mod.ts";
import { defineModule, exportProvider, provide } from "../../packages/njinn/elf/elf.ts";
import { Factory } from "../../packages/njinn/elf/types.ts";

export { Database };

const connectionFactory = (async () => {
  const client = new MongoClient();
  await client.connect("mongodb://localhost:27017");
  return client.database("demo");
}) as Factory;

export class MongoModule {
}

defineModule(MongoModule, {
  providers: [
    provide(Database, connectionFactory),
  ],
  exports: [
    exportProvider(Database),
  ],
});
