import "../packages/core/reflection/reflection.ts";
import { AppModule } from "./app/app-module.ts";
import CtxApplication from "../packages/core/ctx/ctx_application.ts";
import { devLogger } from "../packages/common/logger/dev.ts";
import UsersService from './app/users-service.ts';

const logger = devLogger();
logger.info("creating context application");

const app = CtxApplication.create(AppModule, { logger });
logger.info("application context is ready");

const users = await app.resolve<UsersService>(UsersService);
logger.info("users service resolved %#v", users);
