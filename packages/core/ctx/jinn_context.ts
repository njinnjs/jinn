import type { Ctr } from "../types/reflect.ts";
import type { ModuleRef, Token } from "../types/njinn.ts";
import type { IApplication } from "../types/application.ts";
import { getLogger, Logger } from "../../common/deps/log.ts";
import linker from "../njinn/linker.ts";
import ModuleRegistry from "../njinn/registry/module-registry.ts";

export interface CtxApplicationOptions {
  logger: Logger;
}

export default class JinnContext implements IApplication {
  static create(module: Ctr, options: Partial<CtxApplicationOptions> = {}): JinnContext {
    const logger = options.logger ?? getLogger();
    const registry = new ModuleRegistry();
    return new JinnContext(linker(module, { logger, registry }), registry);
  }

  constructor(private readonly host: ModuleRef, private readonly registry: ModuleRegistry) {
  }

  resolve<T>(token: Token): Promise<T> {
    return this.host.resolve<T>(token);
  }

  select(module: Ctr): ModuleRef {
    return this.registry.fetch(module);
  }
}
