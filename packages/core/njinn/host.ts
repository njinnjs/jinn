import type { Ctr, InjectedMetaParam, ModuleRef, Provider, ProvidingRegistry, Token } from "../types/njinn.ts";
import { Logger } from "../../common/deps/log.ts";
import { read } from "../meta/mod.ts";
import { NjinnKeys, Scopes } from "./decorators.ts";

// todo error handler
// todo logger as factory to allow lazy init

export default class Host implements ModuleRef {
  /**
   * Static (singleton/global) cache
   * @private
   */
  private static readonly global = new Map<Token, unknown>();

  /**
   * Module cache
   * @private
   */
  private readonly cache = new Map<Token, unknown>();
  protected readonly logger: Logger;

  constructor(
    protected readonly module: Ctr,
    protected readonly imported: ModuleRef[],
    protected readonly provided: ProvidingRegistry,
    protected readonly exported: ProvidingRegistry,
    { levelName, handlers }: Logger,
  ) {
    // replace with factory
    this.logger = new Logger(this.id, levelName, { handlers });
  }

  get ref() {
    return this.module;
  }

  get id(): string {
    return this.module.name;
  }

  get imports() {
    return this.imported;
  }

  get exports() {
    return this.exported;
  }

  get provides() {
    return this.provided;
  }

  async resolve<T = unknown>(token: Token): Promise<T> {
    this.logger.debug("resolving %#v", token);

    // is this target already cached (locally)?
    if (this.cache.has(token)) {
      this.logger.debug("token %#v found in cache", token);
      return this.cache.get(token) as T;
    }

    // is this target already cached (globally)?
    if (Host.global.has(token)) {
      this.logger.debug("token %#v found in global cache", token);
      return Host.global.get(token) as T;
    }

    // the search for provider
    const provider = this.provider(token);

    // the creation
    const value = await this.value<T>(provider, token as Ctr);

    // should we cache?!
    switch (provider.scope) {
      case Scopes.Default: // singleton
        Host.global.set(token, value);
        break;
      case Scopes.Module: // each module
        this.cache.set(token, value);
        break;
      case Scopes.None: // new instance for each resolving
        break;
    }
    return value;
  }

  private provider(token: Token): Provider {
    this.logger.debug("search for token %#v in local module", token);
    if (this.provided.has(token)) {
      this.logger.debug("provider for token %#v found in local providers", token);
      return this.provides.fetch(token);
    }
    for (const mdl of this.imported) {
      this.logger.debug("search for token %#v in module %s", token, mdl.id);
      if (mdl.exports.has(token)) {
        this.logger.debug("provider for token %#v found in module %s", token, mdl.id);
        return mdl.provides.fetch(token);
      }
    }
    throw new Error(`unable to find provider for "${String(token)}"`);
  }

  private async value<T>(provider: Provider, target: Ctr): Promise<T> {
    if (provider.useValue) {
      this.logger.debug("providing %#v using value provider", target);
      return provider.useValue as T;
    }

    if (provider.useFactory) {
      this.logger.debug("providing %#v using factory provider", target);
      return await provider.useFactory(this) as Awaited<T>;
    }

    if (provider.useType) {
      this.logger.debug("providing %#v using type provider", target);
      // constructor arguments
      const ctr: Token[] = read<Ctr[]>(NjinnKeys.Ctr, target, []);
      if (ctr.length) {
        const injected = read<InjectedMetaParam[]>(NjinnKeys.Params, target, []);
        if (injected.length) {
          for (const { index, value } of injected) {
            ctr[index] = value;
          }
        }
      }
      // resolve dependencies
      const args: unknown[] = await Promise.all(ctr.map((type) => this.resolve(type)));
      // construct type
      return Reflect.construct(target, args);
    }

    this.logger.debug("invalid provider %j", provider);
    throw new Error("invalid provider");
  }
}
