import type { Provider } from "../../types/njinn.ts";
import { FactoryStrategy, TypeStrategy, ValueStrategy } from "../resolver.ts";

const has = Object.hasOwn;

export default function resolvingStrategy(provider: Provider) {
  if (has(provider, "useValue")) {
    return new ValueStrategy(provider);
  }
  if (has(provider, "useFactory")) {
    return new FactoryStrategy(provider);
  }
  if (has(provider, "useType")) {
    return new TypeStrategy(provider);
  }
  throw new Error("unable to create strategy for provider");
}
