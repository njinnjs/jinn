import { Async, Ctr, Exporter, Func, Provider, Resolver, Token } from "./types.ts";

export interface ModuleOptions {
  imports: JinnModule[];
  providers: Provider[];
  exports: Exporter[];
}

export class JinnModule implements Resolver {
  private readonly cache = new Map<Token, unknown>();
  private static readonly globalCache = new Map<Token, unknown>();

  constructor(public readonly ctr: Ctr, public readonly desc: Partial<ModuleOptions>) {
  }

  get imported(): JinnModule[] {
    return this.desc.imports ?? [];
  }

  get providers(): Provider[] {
    return this.desc.providers ?? [];
  }

  get exporters(): Exporter[] {
    return this.desc.exports ?? [];
  }

  async resolve<T = unknown>(token: Token): Promise<T> {
    if (this.cache.has(token)) {
      return this.cache.get(token) as Async<T>;
    }

    if (JinnModule.globalCache.has(token)) {
      return JinnModule.globalCache.get(token) as Async<T>;
    }

    const { factory, scope } = this.find(token);
    const instance = await factory<T>(this); // add error handler

    if (scope === "local") {
      this.cache.set(token, instance);
    } else if (scope === "global") {
      JinnModule.globalCache.set(token, instance);
    }

    return instance;
  }

  find(token: Token): Provider {
    // look for token in local context
    for (const provider of this.providers) {
      if (provider.token === token) {
        return provider;
      }
    }
    // look in the imported modules
    for (const mdl of this.imported) {
      const results = mdl.exported(token);
      if (results) {
        return results;
      }
    }
    // nothing found
    throw new Error(`unable to find provider for token "${String(token)}"`);
  }

  /**
   * Search the exported items for specific token
   * Return "undefined" if not found
   * @param token
   */
  exported(token: Token): Provider | undefined {
    for (const ex of this.exporters) {
      // if the exporter is a provider and the token match
      if (ex.type === "provider" && ex.exported === token) {
        return this.providers.find((p) => p.token === token) as Provider;
      }
      // if the exporter is a module, search the module exports
      if (ex.type === "module") {
        const m = ex.exported as Func;
        // get the module from the imports
        const mdl = this.imported.find((i) => i.ctr === m) as JinnModule;
        if (!mdl) {
          throw new Error(`module "${m.name}" exported at ${this.ctr.name} but never imported`);
        }
        const result = mdl.exported(token);
        if (result) {
          return result;
        }
      }
    }
    return undefined;
  }
}
