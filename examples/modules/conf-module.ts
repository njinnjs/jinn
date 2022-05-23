import { Module } from "../../packages/njinn/mod.ts";
import { configModule } from "../../packages/config/mod.ts";

@Module(
  ...configModule({ allowEmptyValues: true }),
)
export class ConfModule {
}
