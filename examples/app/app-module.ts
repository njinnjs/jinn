import { Gateway, Module } from "jinn/core/mod.ts";
import { UsersModule } from "./users-module.ts";
import { AppController } from "./app-controller.ts";
import { Middleware } from "../../packages/core/gateway/decorators.ts";
import { Scopes } from "../../packages/core/njinn/decorators.ts";
import LogMiddleware from './log-middleware.ts';

@Module({
  imports: [UsersModule],
  providers: [
    LogMiddleware
  ],
})
@Gateway({
  controllers: [AppController],
})
@Middleware(LogMiddleware)
export class AppModule {
}
