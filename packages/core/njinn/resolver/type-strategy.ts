import { Func, Token, TypeProvider } from "../../types/njinn.ts";
import { readCtrParams } from "../meta.ts";
import { ResolverContext, ResolvingStrategy } from "./base.ts";

export default class TypeStrategy extends ResolvingStrategy<TypeProvider> {
  async resolve<T = unknown>(ctx: ResolverContext) {
    const target = this.provider.useType as Func;
    const args: unknown[] = await Promise.all(readCtrParams(target).map((type: Token) => ctx.resolve(type)));
    return Reflect.construct(target, args);
  }
}
