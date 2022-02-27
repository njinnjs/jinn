import type { InjectableOptions, Target } from "../metadata/types.ts";
import { markInjectable } from "../metadata/accessors.ts";
import { Scopes } from "../metadata/constants.ts";

export default function Injectable(options: Partial<InjectableOptions> = {}): ClassDecorator {
  return (target: Target) => {
    markInjectable(target, options);
  };
}
