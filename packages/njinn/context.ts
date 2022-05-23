import { Ctr } from "../elf/types.ts";
import linker from "../elf/linker.ts";
import { ElfModule } from "../elf/module.ts";

export interface ContextOptions {
  name?: string;
}

export class Context {
  static create(rootModule: Ctr, opts: ContextOptions = {}) {
    const link = linker();
    return new Context(link(rootModule));
  }

  private constructor(private readonly ctx: ElfModule) {
  }

  // lookup for module
  select(mdl: Ctr): ElfModule {
    const selected = this.ctx.select(mdl);
    if (!selected) {
      // error
    }
    return selected as ElfModule;
  }
}
