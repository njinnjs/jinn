import type { Target, Token } from "./types.ts";
import { assertCtr } from "../testing/asserts.ts";
import { getAs, smd } from "./reflects.ts";
import { Keys } from "./constants.ts";

export interface InjectedParam {
  target: Target;
  token: Token;
  index: number;
}

export default function injectParam(target: Target, token: Token, index: number) {
  assertCtr(target);
  const params = getAs<InjectedParam>(Keys.Params, target) ?? [];
  smd(Keys.Params, [...params, { target, token, index }], target);
}
