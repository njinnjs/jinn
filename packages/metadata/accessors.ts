import type { Ctr, InjectableOptions, InjectedParam, ModuleOptions, Target, Token } from "./types.ts";
import { assertCtr } from "../testing/mod.ts";
import { addTo, getAs, smd } from "./reflects.ts";
import { Keys } from "./constants.ts";

// Writers
// ----------------------------------------------------------------------

export function injectParam(target: Target, token: Token, index: number) {
  assertCtr(target);
  addTo<InjectedParam>(Keys.Params, target, { target, token, index });
}

export function markInjectable(target: Target, options: Partial<InjectableOptions>) {
  assertCtr(target);
  smd(Keys.Injectable, options, target);
}

export function markModule(target: Target, options: Partial<ModuleOptions>) {
  assertCtr(target);
  smd(Keys.Module, options, target);
  const a: unknown = () => {
  };
}

// Readers
// ----------------------------------------------------------------------

export function readInjectable(target: Target) {
  assertCtr(target);
  const params = getAs<Ctr[]>(Keys.Ctr, target, []);
  const injectedParams = getAs<Token[]>(Keys.Params, target, []);
  const scope = getAs<InjectableOptions>(Keys.Injectable, target);
}
