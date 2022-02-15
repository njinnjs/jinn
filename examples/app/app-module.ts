import { Gateway, Module } from "jinn/core/mod.ts";
import { UsersModule } from "./users-module.ts";
import { AppController } from "./app-controller.ts";
import { Feature, Middleware } from "../../packages/core/gateway/decorators.ts";
import LogMiddleware from "./log-middleware.ts";

// @Module({
//   imports: [UsersModule],
//   providers: [
//     LogMiddleware,
//   ],
// })
// @Gateway({
//   controllers: [AppController],
// })
// @Middleware(LogMiddleware)
@Feature({
  imports: [UsersModule],
  providers: [
    LogMiddleware,
  ],
  controllers: [AppController],
  middlewares: [LogMiddleware],
})
export default class AppModule {
}
