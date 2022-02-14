import { Controller, Get, Middleware } from "jinn/core/mod.ts";
import LogMiddleware from './log-middleware.ts';

@Middleware(LogMiddleware)
@Controller("/app")
export class AppController {
  @Middleware(LogMiddleware)
  @Get("/hello")
  sayHello() {
    return "hello";
  }
}
