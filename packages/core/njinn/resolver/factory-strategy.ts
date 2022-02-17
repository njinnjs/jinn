import { FactoryProvider } from "../../types/njinn.ts";
import { ResolverContext, ResolvingStrategy } from "./base.ts";

export default class FactoryStrategy extends ResolvingStrategy<FactoryProvider> {
  resolve<T = unknown>(ctx: ResolverContext) {
    return this.provider.useFactory(ctx) as Promise<T>;
  }
}
