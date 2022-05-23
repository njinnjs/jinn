import {
  exportModule,
  exportProvider,
  provide,
  provideLocalType,
  provideLocalValue,
  provideType,
  provideValue,
} from "./elf.ts";
import { assert, assertEquals, assertObjectMatch } from "../testing/deps.ts";
import { Resolver } from "./types.ts";

const token = "token";
const resolver = {} as Resolver;

class TestService {
}

Deno.test("provide() should return a global provider", () => {
  const factory = () => true;
  const p = provide(token, factory);
  assertObjectMatch(p, { token, factory, scope: "global" });
});

Deno.test("provide() should return a local provider", () => {
  const factory = () => true;
  const p = provide(token, factory, "local");
  assertObjectMatch(p, { token, factory, scope: "local" });
});

Deno.test("provideValue() should return a global value provider", () => {
  const value = "test";
  const p = provideValue(token, value);
  assertEquals(p.token, token);
  assertEquals(p.scope, "global");
  assertEquals(typeof p.factory, "function");
  assertEquals(p.factory(resolver), value);
});

Deno.test("provideLocalValue() should return a local value provider", () => {
  const value = "test";
  const p = provideLocalValue(token, value);
  assertEquals(p.token, token);
  assertEquals(p.scope, "local");
  assertEquals(typeof p.factory, "function");
  assertEquals(p.factory(resolver), value);
});

Deno.test("provideType() should return a global type provider", async () => {
  const p = provideType(TestService);
  assertEquals(p.token, TestService);
  assertEquals(p.scope, "global");
  assertEquals(typeof p.factory, "function");
  assert(await p.factory(resolver) instanceof TestService);
});

Deno.test("provideLocalType() should return a global type provider", async () => {
  const p = provideLocalType(TestService);
  assertEquals(p.token, TestService);
  assertEquals(p.scope, "local");
  assertEquals(typeof p.factory, "function");
  assert(await p.factory(resolver) instanceof TestService);
});

Deno.test("exportModule() should return module exported", () => {
  const e = exportModule(TestService);
  assertObjectMatch(e, { type: "module", exported: TestService });
});

Deno.test("exportProvider() should return module exported", () => {
  const e = exportProvider(TestService);
  assertObjectMatch(e, { type: "provider", exported: TestService });
});
