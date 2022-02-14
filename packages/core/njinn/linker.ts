import type {
  Ctr,
  CtrOrProvider,
  LinkerOptions,
  ModuleMetaDescriptor,
  ModuleRef,
  ProvidingRegistry,
} from "../types/njinn.ts";
import { getLogger } from "../../common/deps/log.ts";
import { read } from "../meta/mod.ts";
import { NjinnKeys } from "./decorators.ts";
import ProviderRegistry from "./provider-registry.ts";
import ModuleRegistry from "./module-registry.ts";
import Host from "./host.ts";

export default function linker(options: LinkerOptions = {}) {
  // todo use internal get logger factory function
  const { registry = new ModuleRegistry(), logger = getLogger() } = options;
  return function link(target: Ctr): ModuleRef {
    const { imports, providers, exports } = read<ModuleMetaDescriptor>(NjinnKeys.Module, target);

    const imported: ModuleRef[] = imports.map((m: Ctr) => registry.has(m) ? registry.fetch(m) : link(m));

    const provided: ProviderRegistry = providers.reduce(
      (r: ProvidingRegistry, p: CtrOrProvider): ProviderRegistry => r.register(p),
      new ProviderRegistry(target).register(target),
    );

    const exported = exports.reduce(
      (r: ProvidingRegistry, p: CtrOrProvider) => {
        if (provided.exists(p)) {
          return r.register(p);
        }
        if (registry.has(p as Ctr)) {
          return r.import(registry.fetch(p as Ctr).exports);
        }
        throw new Error(`unable to export ${String(p)}`);
      },
      new ProviderRegistry(target).register(provided.fetch(target)),
    );

    return registry.register(target, new Host(target as Ctr, imported, provided, exported, logger));
  };
}
