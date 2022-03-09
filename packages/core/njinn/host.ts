import type { Ctr, ModuleRef, ProvidingRegistry, Token } from "../types/njinn.ts";
import { Logger } from "../../deps/log.ts";
import { Scopes } from "./meta.ts";
import strategy from "./resolver.ts";
import scanner from "./scanner.ts";

// todo error handler
// todo logger as factory to allow lazy init

export default class Host implements ModuleRef {
  private static readonly global = new Map<Token, unknown>();
  private readonly cache = new Map<Token, unknown>();
  protected readonly logger: Logger = new Logger("host", "DEBUG");

  constructor(
    private readonly module: Ctr,
    public readonly imports: ModuleRef[],
    public readonly provides: ProvidingRegistry,
    public readonly exports: ProvidingRegistry,
    l?: Logger,
  ) {
    // replace with factory
    // this.logger = new Logger(this.id, levelName, { handlers });
  }

  get ref() {
    return this.module;
  }

  get id(): string {
    return this.module.name;
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

    const [at, provider] = scanner(this, token);
    this.logger.debug("provider for token %#v found in %s: %#v", token, at.ref, provider);

    const value = await strategy(provider).resolve<T>(this);
    // should we cache?!
    switch (provider.scope) {
      case Scopes.Default: // singleton
        Host.global.set(token, value);
        break;
      case Scopes.Module: // per module-ref cache
        this.cache.set(token, value);
        break;
      case Scopes.None: // new instance for each resolving
        break;
    }
    return value;
  }
}
