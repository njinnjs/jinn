import { Database, MongoModule } from "./mongo-module.ts";
import {
  exportModule,
  exportProvider,
  exports,
  imports,
  Module,
  providers,
  provideType,
} from "../../packages/njinn/mod.ts";

export class UsersService {
  constructor(public readonly db: Database) {
  }

  all() {
    return this.db.collection("users").find({}).toArray();
  }
}

@Module(
  imports(MongoModule),
  providers(
    provideType(UsersService, Database),
  ),
  exports(
    exportModule(MongoModule),
    exportProvider(UsersService),
  ),
)
export class UsersModule {
}
