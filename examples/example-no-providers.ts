import { Context, imports, Module } from "../packages/njinn/mod.ts";
import { ConfigService } from "../packages/config/mod.ts";
import { UsersModule, UsersService } from "./modules/users-module.ts";
import { ConfModule } from "./modules/conf-module.ts";

@Module(
  imports(UsersModule, ConfModule),
)
export class AppModule {
}

const ctx = Context.create(AppModule);
const users = await ctx.resolve<UsersService>(UsersService);
const conf = await ctx.resolve<ConfigService>(ConfigService);
console.log(await users.all());
console.log(conf.get("JINN"));
