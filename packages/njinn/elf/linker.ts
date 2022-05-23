import { Ctr, ModuleDefinition } from "./types.ts";
import Registry, { ContextRegistry, ModulesRegistry } from "./registry.ts";
import { ElfModule } from "./module.ts";

export type Linker = (app: Ctr) => ElfModule;

export interface LinkerOptions {
  contextRegistry: ContextRegistry;
  modulesRegistry: ModulesRegistry;
}

export default function linker(options: Partial<LinkerOptions> = {}): Linker {
  const { modulesRegistry = Registry.modules(), contextRegistry = Registry.context() } = options;

  function link(ctr: Ctr): ElfModule {
    if (!modulesRegistry.has(ctr)) {
      throw new Error(`module "${ctr.name}" not registered`);
    }

    const { imports: _imports, providers, exports } = modulesRegistry.get(ctr) as ModuleDefinition;
    const imports = (_imports ?? []).map((mdl: Ctr) =>
      contextRegistry.has(mdl) ? contextRegistry.get(mdl) as ElfModule : link(mdl)
    );

    return new ElfModule(ctr, { imports, providers, exports });
  }

  return link;
}
