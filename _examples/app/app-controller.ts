import { Controller, Get, Middleware } from "../../packages/core/gateway/decorators.ts";

@Middleware(Date)
@Controller("app")
export class AppController {
  @Middleware(Date)
  @Get("hello")
  sayHello() {
    return "hello";
  }
}
