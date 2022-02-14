import { Ctr, LinkerRegistry } from "../types/njinn.ts";
import { Logger } from "../../common/logger/dev.ts";
import linker from "../njinn/linker.ts";
import GatewayApplication from "./application.ts";
import ModuleRegistry from "../njinn/module-registry.ts";
import { GatewayAdapter } from "./types.ts";

export interface FactoryOptions {
  logger: Logger;
  registry?: LinkerRegistry;
}

export default function createGatewayApplication(module: Ctr, adapter: GatewayAdapter, options: FactoryOptions) {
  const { logger, registry = new ModuleRegistry() } = options;
  const host = linker({ logger, registry })(module);
  return new GatewayApplication(host, adapter, { logger, registry });
}
