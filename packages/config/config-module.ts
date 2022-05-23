import {
  exportModule,
  exportProvider,
  exports,
  imports,
  Module,
  provide,
  providers,
  provideType,
  provideValue,
} from "../njinn/mod.ts";
import { ConfigService } from "./config-service.ts";
import { ConfigOptions } from "./deps.ts";
import { CONFIG_DATA_TOKEN, CONFIG_OPTION_TOKEN, configFactory } from "./config-factory.ts";

// this is an example technic
// don't use as an API for now
export function configModule(options: ConfigOptions) {
  return [
    imports(ConfigModule),
    providers(provideValue(CONFIG_OPTION_TOKEN, options)),
    exports(exportProvider(CONFIG_OPTION_TOKEN), exportModule(ConfigModule)),
  ];
}

@Module(
  providers(
    provideValue(CONFIG_OPTION_TOKEN, {}),
    provide(CONFIG_DATA_TOKEN, configFactory),
    provideType(ConfigService, CONFIG_DATA_TOKEN),
  ),
  exports(
    exportProvider(CONFIG_OPTION_TOKEN),
    exportProvider(CONFIG_DATA_TOKEN),
    exportProvider(ConfigService),
  ),
)
export class ConfigModule {
}
