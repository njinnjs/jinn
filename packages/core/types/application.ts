import { Ctr, ModuleRef, Token } from "./njinn.ts";

export interface IApplication {
  resolve<T>(token: Token): Promise<T>;

  select(module: Ctr): ModuleRef;
}
