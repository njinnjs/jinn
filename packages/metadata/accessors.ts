import type { Ctr, InjectableOptions, InjectedParam, Target, Token } from "./types.ts";
import { assertCtr } from "../testing/mod.ts";
import { getAs, smd } from "./reflects.ts";
import { Keys } from "./constants.ts";

// Writers
// ----------------------------------------------------------------------

export function injectParam(target: Target, token: Token, index: number) {
  assertCtr(target);
  const params = getAs<InjectedParam[]>(Keys.Params, target) ?? [];
  smd(Keys.Params, [...params, { target, token, index }], target);
}

export function markInjectable(target: Target, options: Partial<InjectableOptions>) {
  assertCtr(target);
  const scope = smd(Keys.Injectable, options, target);
}

export function markModule(target: Target, options: any) {
  assertCtr(target);
  smd(Keys.Module, options, target);
}

// Readers
// ----------------------------------------------------------------------

export function readInjectable(target: Target) {
  assertCtr(target);
  const params = getAs<Ctr[]>(Keys.Ctr, target, []);
  const injectedParams = getAs<Token[]>(Keys.Params, target, []);
  const scope = getAs<InjectableOptions>(Keys.Injectable, target);
}
