#!/usr/bin/env -S deno run --allow-net --allow-read --import-map import_map.json
import "jinn/core/reflect.ts";
import JinnContext from "jinn/core/ctx/jinn_context.ts";
import { devLogger } from "jinn/common/logger/dev.ts";
import UsersService from "./app/users-service.ts";
import AppModule from "./app/app-module.ts";

const logger = devLogger();
logger.info("creating context application");

const app = JinnContext.create(AppModule, { logger });
logger.info("application context is ready");

const users = await app.resolve<UsersService>(UsersService);
logger.info("users service resolved %#v", users);
