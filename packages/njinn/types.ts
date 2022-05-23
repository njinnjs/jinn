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
  new(...args: Instance[]): T;
}

export type Async<T> = T | Promise<T>;

// Jinn types
export type Token = Ctr | Func | string | symbol;

export interface Resolver {
  resolve<T = unknown>(token: Token): Promise<T>;
}

export type Factory = <T = unknown>(resolver: Resolver) => Promise<T> | T;

export type Scope = "local" | "global";
export type ExportType = "module" | "provider";
export type Provider = { token: Token; factory: Factory; scope: Scope };
export type Exporter = { type: ExportType; exported: Token };

// Module
export type ModuleDefPayload = Provider | ModuleDesc;
export type ModuleDef = [symbol, ModuleDefPayload];

export type ModuleDesc = [Ctr, ModuleDef[]];

export interface ModuleDefinition {
  imports: Ctr[];
  providers: Provider[];
  exports: Exporter[];
}
