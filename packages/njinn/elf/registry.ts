import { Ctr, ModuleDefinition } from "./types.ts";
import { ElfModule } from "./module.ts";

export type ModulesRegistry = WeakMap<Ctr, Partial<ModuleDefinition>>;
export type ContextRegistry = WeakMap<Ctr, ElfModule>;

export default class Registry {
  static modulesRegistry = new WeakMap();
  static contextRegistry = new WeakMap();

  static modules(): ModulesRegistry {
    return Registry.modulesRegistry;
  }

  static context(): ContextRegistry {
    return Registry.contextRegistry;
  }
}
