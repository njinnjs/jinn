export type { MetadataKey, PropertyKey, Target } from "../reflection/reflection.ts";

// deno-lint-ignore no-explicit-any
export type Instance<T = any> = T;

export interface Ctr<T = Instance> extends Function {
  new (...args: Instance[]): T;
}

export type Property = string | symbol;

// deno-lint-ignore ban-types
export type Func<TFunction = Function> = TFunction;
