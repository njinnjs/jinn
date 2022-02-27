import type { InjectableOptions, Target } from "./types.ts";
import { assertCtr } from "../testing/mod.ts";
import { smd } from "./reflects.ts";
import { Keys } from "./constants.ts";

export default function markInjectable(target: Target, options: InjectableOptions) {
  assertCtr(target);
  smd(Keys.Injectable, options, target);
}
