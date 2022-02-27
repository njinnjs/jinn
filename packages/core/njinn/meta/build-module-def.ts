import type { Target, Token } from "../../types/njinn.ts";
import { readInjectable, readModule } from "../meta.ts";
import { AnyProvider, Ctr, Provider } from "../../types/njinn.ts";
import { assert } from "../../../testing/mod.ts";
import resolvingStrategy from "../resolver/resolving-strategy.ts";
import { assertImports } from "./_asserts.ts";

// const isModule = (ctr: Ctr) => !!readModule(ctr);
// const isProvider = (p: AnyProvider | Ctr) => typeof p === "function" || p.token;
// const isExports = (e: AnyProvider | Ctr | Token) => isModule(e as Ctr) || isProvider(e as Ctr | AnyProvider);

// todo assert contain injectable
const normalizeProviders = (p: AnyProvider | Ctr): Provider =>
  (typeof p === "function" ? readInjectable(p) : p) as Provider;

const normalizeExports = (p: any) => Object.hasOwn(p, "token") ? p.token : p;

export default function buildModuleDef(target: Target) {
  const { imports, providers, exports } = readModule(target);

  assertImports(imports);
  // imports.forEach(i => assert(isModule(i), `unable to import ${String(i)}`));
  // providers.forEach(p => assert(isProvider(p), `unable to provide ${String(p)}`));
  // exports.forEach(e => assert(isExports(e), `unable to export ${String(e)}`));

  providers.map(normalizeProviders).map(resolvingStrategy);
  // const imports = mark.imports ?? [];
  // const providers = (mark.providers ?? []).map(normalizeProviders).map(strategy);
  // const exports = (mark.exports ?? []).map(normalizeExports);
  // define<ModuleMetaDescriptor<ResolvingStrategy, Token>>(NjinnKeys.Module, {
  //   imports,
  //   providers,
  //   exports,
  // }, target);
}
