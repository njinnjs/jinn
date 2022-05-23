import { Ctr, ModuleDefinition } from "./types.ts";
import Registry from "./registry.ts";
import { ElfModule } from "./module.ts";

export type Linker = (app: Ctr) => ElfModule;

export interface LinkerOptions {
  registry: WeakMap<Ctr, Partial<ModuleDefinition>>;
  context: WeakMap<Ctr, ElfModule>;
}

export default function linker(options: Partial<LinkerOptions> = {}): Linker {
  const { registry = Registry.modules(), context = Registry.context() } = options;

  function link(ctr: Ctr): ElfModule {
    const definition = registry.get(ctr) as ModuleDefinition;
    const imports = (definition.imports ?? []).map((mdl) =>
      context.has(mdl) ? context.get(mdl) as ElfModule : link(mdl)
    );
    return new ElfModule(ctr, {
      imports,
      providers: definition.providers ?? [],
      exports: definition.exports ?? [],
    });
  }

  return link;
}
