import "jinn/reflect";
import { devLogger } from "jinn/common/logger/dev.ts";
import { AppModule } from "./app/app-module.ts";
import createGatewayApplication from "../packages/core/gateway/factory.ts";
import OpineAdapter from "../packages/adapters/opine/opine.ts";

const app = createGatewayApplication(AppModule, new OpineAdapter(), { logger: devLogger() });
await app.init();
await app.listen();
