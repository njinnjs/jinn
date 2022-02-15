import type { Ctr } from "../types/reflect.ts";
import type { ModuleRef, Token } from "../types/njinn.ts";
import type { IApplication } from "../types/application.ts";
import linker from "../njinn/linker.ts";
import { getLogger, Logger } from "../../common/deps/log.ts";
import ModuleRegistry from "../njinn/module-registry.ts";

export interface CtxApplicationOptions {
  logger: Logger;
}

export default class CtxApplication implements IApplication {
  static create(module: Ctr, options: Partial<CtxApplicationOptions> = {}): CtxApplication {
    const logger = options.logger ?? getLogger();
    const registry = new ModuleRegistry();
    return new CtxApplication(linker(module, { logger, registry }), registry);
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
