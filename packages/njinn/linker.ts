import { Ctr, ModuleDefinition } from "./types.ts";
import Registry from "./registry.ts";
import { JinnModule } from "./module.ts";

export type Linker = (app: Ctr) => JinnModule;

export interface LinkerOptions {
  registry: WeakMap<Ctr, Partial<ModuleDefinition>>;
  context: WeakMap<Ctr, JinnModule>;
}

export default function linker(options: Partial<LinkerOptions> = {}): Linker {
  const { registry = Registry.modules(), context = Registry.context() } = options;

  function link(ctr: Ctr): JinnModule {
    const definition = registry.get(ctr) as ModuleDefinition;
    const imports = (definition.imports ?? []).map((mdl) =>
      context.has(mdl) ? context.get(mdl) as JinnModule : link(mdl)
    );
    return new JinnModule(ctr, {
      imports,
      providers: definition.providers ?? [],
      exports: definition.exports ?? [],
    });
  }

  return link;
}
