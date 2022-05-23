import { define, imports } from "../packages/elf/mod.ts";
import { Context } from "../packages/njinn/mod.ts";
import { UsersModule, UsersService } from "./modules/users-module.ts";

export class AppModule {
}
define(AppModule, imports(UsersModule));

const ctx = Context.create(AppModule);
const users = await ctx.select(AppModule).resolve<UsersService>(UsersService);
console.log(await users.all());
