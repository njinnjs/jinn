import type { Logger } from "jinn/common/deps/mod.ts";
import type { Ctr, Func, Property, Target } from "./reflect.ts";

// reflect
export type { Ctr, Func, Property, Target };

// token & resolver
export type Token = Target | symbol | string;
export type Resolver = { resolve<T>(t: Token): Promise<T> };
export type Factory<T> = (ctx: Resolver) => Promise<T>;

// providers
export type Provide<T> = { token: Token; scope: string } & T;
export type ValueProvider = Provide<{ useValue: unknown }>;
export type TypeProvider = Provide<{ useType: Token }>;
export type FactoryProvider<T = unknown> = Provide<{ useFactory: Factory<T> }>;
export type Provider = ValueProvider & TypeProvider & FactoryProvider;
export type AnyProvider = ValueProvider | TypeProvider | FactoryProvider;

// metadata
export type InjectedMetaParam = { index: number; value: Token };
export type InjectableMetaDescriptor = { scope: string };

// registries
export type CtrOrProvider = Ctr | AnyProvider;
export type TokenOrProvider = Token | Provider;

export interface ProvidingRegistry extends Map<Token, Provider> {
  readonly module: Ctr;

  fetch(key: TokenOrProvider): Provider;

  exists(key: TokenOrProvider): boolean;

  register(key: TokenOrProvider): ProvidingRegistry;

  import(registry: ProvidingRegistry): ProvidingRegistry;
}

// module
export interface ModuleMetaDescriptor<P = CtrOrProvider, E = TokenOrProvider> {
  imports: Ctr[];
  providers: P[];
  exports: E[];
}

export interface ModuleRef {
  id: string;
  ref: Ctr;
  imports: ModuleRef[];
  exports: ProvidingRegistry;
  provides: ProvidingRegistry;

  resolve<T = unknown>(target: Token): Promise<T>;
}

// linker
export interface LinkerRegistry extends WeakMap<Ctr, ModuleRef> {
  fetch(target: Ctr): ModuleRef;

  register(target: Ctr, ref: ModuleRef): ModuleRef;
}

export type LinkerOptions = { registry?: LinkerRegistry; logger?: Logger };
