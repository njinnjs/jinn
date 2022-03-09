import type { InjectedParam, Target, Token } from "./types.ts";
import { assertCtr } from "../testing/asserts.ts";
import { addTo } from "./reflects.ts";
import { Keys } from "./constants.ts";

export default function injectParam(target: Target, token: Token, index: number) {
  assertCtr(target);
  addTo<InjectedParam>(Keys.Params, target, { target, token, index });
}
