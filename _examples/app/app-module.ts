import { Gateway, Module } from "jinn/core/mod.ts";
import { UsersModule } from "./users-module.ts";
import { AppController } from "./app-controller.ts";

@Module({
  imports: [UsersModule],
})
@Gateway({
  controllers: [AppController],
})
export class AppModule {
}
