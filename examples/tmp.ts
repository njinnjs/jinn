import "jinn/reflect";
import { devLogger } from "jinn/common/logger/dev.ts";
import { AppModule } from "./app/app-module.ts";
import createGatewayApplication from "../packages/core/gateway/factory.ts";
import OpineAdapter from "../packages/adapters/opine/opine.ts";

const logger = devLogger();
const app = createGatewayApplication(AppModule, new OpineAdapter(), { logger });
await app.init();
// await app.listen({ port: 3333, hostname: "0.0.0.0" });
logger.info("ready");
