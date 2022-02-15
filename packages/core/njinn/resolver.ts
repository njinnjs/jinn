import { Provider, Token } from "../types/njinn.ts";

export type Async<T> = T | Promise<T>;

export interface ResolverContext {
  esolve<T = unknown>(token: Token): Promise<T>;
}

export interface ResolvingStrategy {
  resolve<T = unknown>(ctx: ResolverContext): Async<T>;
}

export class Resolver {
  constructor(private readonly strategy: ResolvingStrategy) {
  }

  resolve() {
  }
}
