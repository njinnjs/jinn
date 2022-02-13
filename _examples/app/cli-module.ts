import { Module } from "jinn/core/mod.ts";
import { UsersModule } from "./users-module.ts";

@Module({
  imports: [UsersModule],
})
export default class CliModule {
}