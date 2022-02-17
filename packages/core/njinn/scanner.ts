import { ModuleRef, Provider, Token } from "../types/njinn.ts";

export default function scanner(module: ModuleRef, token: Token): [ModuleRef, Provider] {
  for (const mdl of [module, ...module.imports]) {
    if (mdl.exports.has(token)) {
      return [mdl, mdl.provides.fetch(token)];
    }
  }
  throw new Error(`unable to find provider for "${String(token)}"`);
}
