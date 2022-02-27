import type { Property, Target, Token } from "../metadata/types.ts";
import injectParam from "../metadata/inject-param.ts";

export default function Inject(token: Token): ParameterDecorator {
  return (target: Target, _: Property, index: number) => {
    injectParam(target, token, index);
  };
}
