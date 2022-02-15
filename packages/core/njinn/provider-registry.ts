import type { Ctr, Provider, ProvidingRegistry, Token, TokenOrProvider } from "../types/njinn.ts";
import { isCallable } from "../../common/utils/mod.ts";
import { readInjectable } from "./meta.ts";

const norm = (key: TokenOrProvider): Token => (key as Provider).token ?? key;

export default class ProviderRegistry extends Map<Token, Provider> implements ProvidingRegistry {
  constructor(public readonly module: Ctr) {
    super();
  }

  fetch(key: TokenOrProvider): Provider {
    return this.get(norm(key)) as Provider;
  }

  exists(key: TokenOrProvider): boolean {
    return this.has(norm(key));
  }

  register(key: TokenOrProvider) {
    const provider = isCallable(key) ? readInjectable(key) : key as Provider;
    this.set(provider.token, provider);
    return this;
  }

  import(registry: ProvidingRegistry) {
    for (const [token, provider] of registry.entries()) {
      if (!this.has(token)) {
        this.set(token, provider);
      }
    }
    return this;
  }
}
