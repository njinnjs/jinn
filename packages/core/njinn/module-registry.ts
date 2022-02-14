import type { Ctr, LinkerRegistry, ModuleRef } from "../types/njinn.ts";

export default class ModuleRegistry extends WeakMap<Ctr, ModuleRef> implements LinkerRegistry {
  fetch(target: Ctr) {
    return this.get(target) as ModuleRef;
  }

  register(target: Ctr, ref: ModuleRef) {
    this.set(target, ref);
    return ref;
  }
}
