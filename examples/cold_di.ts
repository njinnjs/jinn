import "jinn/reflect";
import { linker } from "jinn/core/mod.ts";
import { devLogger } from "jinn/common/logger/dev.ts";
import { AppModule } from "./app/app-module.ts";
import UsersService from "./app/users-service.ts";

/**
 * Explain cold DI here
 */

const logger = devLogger("ColdDI");
const ctx = linker({ logger })(AppModule);
try {
  const users = await ctx.resolve<UsersService>(UsersService);
  logger.info("users service resolved %#v", users);
} catch (e) {
  logger.error(e);
}
Deno.exit(0);
