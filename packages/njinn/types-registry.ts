import type { Ctr } from "../metadata/types.ts";
import { Scopes } from "../core/njinn/meta.ts";

export interface TypeDescriptor {
  scope: Scopes;
}

export class TypesRegistry extends Map<Ctr, TypeDescriptor> {
  register(type: Ctr, desc: TypeDescriptor) {
    this.set(type, desc);
  }
}

const typeRegistry = new TypesRegistry();
export default typeRegistry;
