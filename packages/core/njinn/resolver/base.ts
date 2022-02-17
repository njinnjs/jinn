import { AnyProvider, Token } from "../../types/njinn.ts";

export type Async<T> = T | Promise<T>;

export interface ResolverContext {
  resolve<T = unknown>(token: Token): Promise<T>;
}

export abstract class ResolvingStrategy<T = AnyProvider> {
  constructor(protected readonly provider: AnyProvider & T) {
  }

  get token(): Token {
    return this.provider.token;
  }

  abstract resolve<T = unknown>(ctx: ResolverContext): Async<T>;
}
