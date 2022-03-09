import type { MetadataKey, PropertyKey, Target } from "../core/reflection/reflection.ts";
import { Scopes } from "./constants.ts";

// Reflection, Metadata & Core Types
// ----------------------------------------------------------------------
export { MetadataKey, PropertyKey, Target };

// Instance of unknown constructor
// deno-lint-ignore no-explicit-any
export type Instance<T = any> = T;

// Constructor (class) type
export interface Ctr<T = Instance> extends Function {
  new (...args: Instance[]): T;
}

// Replacement for Function when needed by design (js internals)
// deno-lint-ignore ban-types
export type Func<TFunction = Function> = TFunction;

// Metadata property
export type Property = string | symbol;

// Injection token
export type Token = Target | symbol | string;

// Metadata Accessors Types
// ----------------------------------------------------------------------

export interface InjectedParam {
  target: Target;
  token: Token;
  index: number;
}

export interface InjectableOptions {
  scope: Scopes;
}

export interface ModuleOptions {
}
