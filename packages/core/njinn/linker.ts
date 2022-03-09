import type { Ctr, CtrOrProvider, LinkerOptions, ModuleRef, Token } from "../types/njinn.ts";
import { getLogger } from "../../deps/log.ts";
import { readMdl } from "./meta.ts";
import ProviderRegistry from "./provider-registry.ts";
import ModuleRegistry from "./registry/module-registry.ts";
import Host from "./host.ts";
import { ResolvingStrategy } from "./resolver.ts";
import { TokenOrProvider } from "../types/njinn.ts";
import ResolverRegistry from "./registry/resolver-registry.ts";

const register = (r: ResolverRegistry, s: ResolvingStrategy): ResolverRegistry => r.register(s);

export default function linker(target: Ctr, options: LinkerOptions = {}) {
  // todo use internal get logger factory function
  const { registry = new ModuleRegistry(), logger = getLogger() } = options;

  const link = (target: Ctr): ModuleRef => {
    const { imports, providers, exports, resolver } = readMdl(target);

    // const imported: ModuleRef[] = imports.map((m: Ctr) => registry.has(m) ? registry.fetch(m) : link(m));
    //
    // const provided: ResolversRegistry = providers.reduce(register, new ResolversRegistry(target, resolver));
    //
    // for (const e of exports) {
    // }
    // const exported = exports.reduce(
    //   (r: ResolversRegistry, p: CtrOrProvider) => {
    //     if (provided.exists(p)) {
    //       return r.register(p);
    //     }
    //     if (registry.has(p as Ctr)) {
    //       return r.import(registry.fetch(p as Ctr).exports);
    //     }
    //     throw new Error(`unable to export ${String(p)}`);
    //   },
    //   new ResolversRegistry(target, resolver),
    // );

    return registry.register(target, new Host(target as Ctr, imported, provided, exported, logger));
  };

  return link(target);
}
