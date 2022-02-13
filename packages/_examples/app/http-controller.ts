import { Controller, Get } from "jinn/gateway/mod.ts";

@Controller("test")
export default class HttpController {
  @Get("example")
  exampleGet() {
    return 1;
  }
  //
  // @Get('foo')
  // exampleFoo() {
  //   return 2;
  // }
}
