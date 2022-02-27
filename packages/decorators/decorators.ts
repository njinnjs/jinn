// // import type { InjectableMetaDescriptor, ModuleMetaDescriptor, Property, Target, Token } from "../types/njinn.ts";
// // import { markInject, markInjectable, markModule } from "./meta.ts";
//
// export function Module(desc: Partial<ModuleMetaDescriptor> = {}): ClassDecorator {
//   return (target: Target) => {
//     markModule(target, desc);
//     markInjectable(target);
//   };
// }
//
// export function Injectable(desc: Partial<InjectableMetaDescriptor> = {}): ClassDecorator {
//   return (target: Target) => {
//     markInjectable(target, desc);
//   };
// }
//
// export function Inject(token: Token): ParameterDecorator {
//   return (target: Target, _: Property, index: number) => {
//     markInject(target, token, index);
//   };
// }
