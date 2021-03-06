import type {
  Ctr,
  Exporter,
  Factory,
  ModuleDefinition,
  ModuleDefs,
  Provider,
  ProviderScope,
  Resolver,
  Token,
} from "./types.ts";
import Registry from "./registry.ts";

const fromType = (ctr: Ctr, tokens: Token[]) =>
  (resolver: Resolver) =>
    Promise.all(tokens.map((token) => resolver.resolve(token)))
      .then((args) => Reflect.construct(ctr, args));

export function provide(token: Token, factory: Factory, scope: ProviderScope = "global"): Provider {
  return { token, factory, scope };
}

export function provideValue<T = unknown>(token: Token, value: T): Provider {
  return provide(token, (() => value) as Factory);
}

export function provideLocalValue<T = unknown>(token: Token, value: T): Provider {
  return provide(token, (() => value) as Factory, "local");
}

export function provideType<T = unknown>(type: Ctr, ...inject: Token[]): Provider {
  return provide(type, fromType(type, inject));
}

export function provideLocalType<T = unknown>(type: Ctr, ...inject: Token[]): Provider {
  return provide(type, fromType(type, inject), "local");
}

export function exportModule(exported: Ctr): Exporter {
  return { type: "module", exported };
}

export function exportProvider(exported: Token): Exporter {
  return { type: "provider", exported };
}

export function defineModule(
  mdl: Ctr,
  definition: Partial<ModuleDefinition>,
  registry = Registry.modules(),
) {
  registry.set(mdl, definition);
}

export function providers(...p: Provider[]): ModuleDefs<Provider> {
  return ["providers", p];
}

export function imports(...i: Ctr[]): ModuleDefs<Ctr> {
  return ["imports", i];
}

export function exports(...e: Exporter[]): ModuleDefs<Exporter> {
  return ["exports", e];
}

export function define(mdl: Ctr, ...defs: ModuleDefs[]) {
  defineModule(
    mdl,
    defs.reduce((acc, [key, items]) => {
      // @ts-ignore no type convention to solve the implicit "any" conflict
      acc[key] = [...(acc[key] ?? []), ...items];
      return acc;
    }, {} as Partial<ModuleDefinition>),
  );
}
