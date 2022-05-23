import { Ctr, ModuleDefinition } from "./types.ts";
import { JinnModule } from "./module.ts";

export default class Registry {
  static modulesRegistry = new WeakMap();
  static globalContext = new WeakMap();

  static modules(): WeakMap<Ctr, Partial<ModuleDefinition>> {
    return Registry.modulesRegistry;
  }

  static context(): WeakMap<Ctr, JinnModule> {
    return Registry.globalContext;
  }
}
