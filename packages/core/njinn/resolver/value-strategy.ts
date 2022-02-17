import { ValueProvider } from "../../types/njinn.ts";
import { ResolvingStrategy } from "./base.ts";

export default class ValueStrategy extends ResolvingStrategy<ValueProvider> {
  resolve<T = unknown>() {
    return this.provider.useValue as T;
  }
}
