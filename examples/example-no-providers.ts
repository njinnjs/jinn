// create app module
// provide configuration
// create database connection
// use users service to read users
import { define, imports } from '../packages/njinn/jinn.ts';
import linker from '../packages/njinn/linker.ts';
import { UsersModule, UsersService } from "./modules/users-module.ts";


export class AppModule {
}
define(AppModule, imports(UsersModule));

const link = linker();
const app = link(AppModule);
const users = await app.resolve<UsersService>(UsersService);
console.log(await users.all());
