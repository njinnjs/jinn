import { Module } from "jinn/core/mod.ts";
import HttpController from "./http-controller.ts";

@Module({
  controllers: [HttpController],
})
export default class HttpModule {
}
