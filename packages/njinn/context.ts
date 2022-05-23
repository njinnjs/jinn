import { Ctr, Func, Token } from "./elf/types.ts";
import linker, { LinkerOptions } from "./elf/linker.ts";
import { ElfModule } from "./elf/module.ts";
import Registry from "./elf/registry.ts";

export interface ContextOptions extends LinkerOptions {
  logger: Func;
}

export class Context {
  static create(rootModule: Ctr, options: Partial<ContextOptions> = {}): Context {
    const { contextRegistry = Registry.context(), modulesRegistry = Registry.modules() } = options;
    return new Context(linker({ contextRegistry, modulesRegistry })(rootModule));
  }

  private constructor(private readonly root: ElfModule) {
  }

  /**
   * Module lookup
   * @param mdl
   */
  select(mdl: Ctr): ElfModule {
    return Registry.context().get(mdl) as ElfModule;
  }

  /**
   * Root module resolver
   * @param token
   */
  resolve<T = unknown>(token: Token): Promise<T> {
    return this.root.resolve<T>(token);
  }
}
