import type { Ctr, Provider, ProvidingRegistry, Token, TokenOrProvider } from "../types/njinn.ts";
import { isCallable } from "jinn/common/utils/mod.ts";
import { read } from "../meta/mod.ts";
import { NjinnKeys } from "./decorators.ts";

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
    const provider = isCallable(key) ? read<Provider>(NjinnKeys.Injectable, key) : key as Provider;
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
