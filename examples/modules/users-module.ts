import { Database, MongoModule } from "./mongo-module.ts";
import { define, exports, imports, providers, exportModule, exportProvider, provideType } from '../../packages/njinn/jinn.ts';

export class UsersService {
  constructor(public readonly db: Database) {
  }

  all() {
    return this.db.collection("users").find({}).toArray();
  }
}

export class UsersModule {
}

define(UsersModule,
  imports(
    MongoModule,
  ),
  providers(
    provideType(UsersService, Database),
  ),
  exports(
    exportModule(MongoModule),
    exportProvider(UsersService),
  )
);
