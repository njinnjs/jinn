import "jinn/reflect";
import { linker } from "jinn/core/njinn/mod.ts";
import { devLogger } from "jinn/common/logger/dev.ts";
import { AppModule } from "./app/app-module.ts";
import UsersService from "./app/users-service.ts";

const logger = devLogger();
const ctx = linker({ logger })(AppModule);
const users = await ctx.resolve<UsersService>(UsersService);
logger.info(users);
