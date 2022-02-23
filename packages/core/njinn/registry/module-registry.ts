import type { Ctr, ModuleRef } from "../../types/njinn.ts";
import { assert } from "../../../testing/mod.ts";

export default class ModuleRegistry extends WeakMap<Ctr, ModuleRef> {
  fetch(target: Ctr) {
    assert(this.has(target), `unable to fetch target ${target}`);
    return this.get(target) as ModuleRef;
  }

  register(target: Ctr, ref: ModuleRef): ModuleRef {
    this.set(target, ref);
    return ref;
  }

  get detached() {
    return {
      fetch: this.fetch.bind(this),
      register: this.register.bind(this),
    };
  }
}
