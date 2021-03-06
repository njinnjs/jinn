// DSL types
// ---------

// Replacement for Function when needed by design (js internals)
// deno-lint-ignore ban-types
export type Func<TFunction = Function> = TFunction;

// Instance of unknown instance
// deno-lint-ignore no-explicit-any
export type Instance<T = any> = T;

// Constructor (class) type
export interface Ctr<T = Instance> extends Function {
  new (...args: Instance[]): T;
}

export type Async<T> = T | Promise<T>;

// Jinn types

export type Token = Ctr | Func | string | symbol;

export interface Resolver {
  resolve<T = unknown>(token: Token): Promise<T>;
}

export type Factory = (resolver: Resolver) => unknown;

export type ProviderScope = "local" | "global";
export type Provider = { token: Token; factory: Factory; scope: ProviderScope };

export type ExportType = "module" | "provider";
export type Exporter = { exported: Token; type: ExportType };

export interface ModuleDefinition {
  imports: Ctr[];
  providers: Provider[];
  exports: Exporter[];
}

export type ModuleDefKey = keyof ModuleDefinition;
export type ModuleDefValue = Provider | Ctr | Exporter;
export type ModuleDefs<T = ModuleDefValue> = [ModuleDefKey, T[]];
