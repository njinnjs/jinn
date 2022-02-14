import "jinn/reflect";
import type { Target } from "../types/reflect.ts";
import type { ModuleRef } from "../types/njinn.ts";
import linker from "./linker.ts";
import { assert } from "jinn/testing/mod.ts";
import { ModuleTest } from "jinn/testing/nginn_testing.ts";
import Host from "./host.ts";

const setup = (): Host => {
  const registry = new WeakMap<Target, ModuleRef>();
  const link = linker({ registry });
  return link(ModuleTest);
};

Deno.test("should select module", () => {
  const host = setup();
  assert(host);
});
