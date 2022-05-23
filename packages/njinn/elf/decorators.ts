import { Ctr, ModuleDefs } from "./types.ts";
import { define } from "./elf.ts";

export function Module(...defs: ModuleDefs[]) {
  return (ctr: Ctr) => {
    define(ctr, ...defs);
  };
}
