import type { ModuleRef } from "../types/njinn.ts";

export default function* moduleRef(host: ModuleRef): Generator<ModuleRef> {
  yield host;
  for (const i of host.imports) {
    yield* moduleRef(i);
  }
}
