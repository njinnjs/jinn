import { assert } from "./deps.ts";

export function assertNot(condition: boolean, message?: string): asserts condition {
  assert(!condition, message);
}

export function assertCtr(ctr: unknown, message?: string): asserts ctr {
  assertNot(ctr instanceof Function, message ?? `target ${ctr} should be constructor`);
}
