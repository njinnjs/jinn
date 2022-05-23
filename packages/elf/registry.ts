import { Ctr, ModuleDefinition } from "./types.ts";
import { ElfModule } from "./module.ts";

export default class Registry {
  static modulesRegistry = new WeakMap();
  static globalContext = new WeakMap();

  static modules(): WeakMap<Ctr, Partial<ModuleDefinition>> {
    return Registry.modulesRegistry;
  }

  static context(): WeakMap<Ctr, ElfModule> {
    return Registry.globalContext;
  }
}
