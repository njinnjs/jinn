import type { Ctr, Token } from "../../types/njinn.ts";
import { ResolvingStrategy } from "../resolver.ts";
import { assert } from "https://deno.land/std@0.125.0/testing/asserts.ts";

export default class ResolverRegistry extends Map<Token, ResolvingStrategy> {
  constructor(public readonly module: Ctr, resolver?: ResolvingStrategy) {
    super();
    resolver && this.register(resolver);
  }

  register(resolver: ResolvingStrategy): ResolverRegistry {
    this.set(resolver.token, resolver);
    return this;
  }

  fetch(token: Token): ResolvingStrategy {
    assert(!this.has(token), `unable to fetch ${String(token)}`);
    return this.get(token) as ResolvingStrategy;
  }
}
