import { AnyProvider, FactoryProvider, Func, Provider, Token, TypeProvider, ValueProvider } from "../types/njinn.ts";
import { readCtrParams } from "./meta.ts";

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

export class ValueStrategy extends ResolvingStrategy<ValueProvider> {
  resolve<T = unknown>() {
    return this.provider.useValue as T;
  }
}

export class FactoryStrategy extends ResolvingStrategy<FactoryProvider> {
  resolve<T = unknown>(ctx: ResolverContext) {
    return this.provider.useFactory(ctx) as Promise<T>;
  }
}

export class TypeStrategy extends ResolvingStrategy<TypeProvider> {
  async resolve<T = unknown>(ctx: ResolverContext) {
    const target = this.provider.useType as Func;
    const args: unknown[] = await Promise.all(readCtrParams(target).map((type: Token) => ctx.resolve(type)));
    return Reflect.construct(target, args);
  }
}

export default function strategy(provider: Provider) {
  if (provider["useValue"]) {
    return new ValueStrategy(provider);
  }
  if (provider["useFactory"]) {
    return new FactoryStrategy(provider);
  }
  if (provider["useType"]) {
    return new TypeStrategy(provider);
  }
  throw new Error("unable to create strategy for provider");
}
