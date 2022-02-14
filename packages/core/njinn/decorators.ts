import type {
  InjectableMetaDescriptor,
  InjectedMetaParam,
  ModuleMetaDescriptor,
  Property,
  Target,
  Token,
  TypeProvider,
} from "../types/njinn.ts";
import { define, merge } from "../meta/mod.ts";

export enum Scopes {
  Default = "Default",
  Module = "Module",
  None = "None",
}

export enum NjinnKeys {
  Ctr = "design:paramtypes",
  Module = "xpr:modules",
  Params = "xpr:params",
  Injectable = "xpr:injectable",
}

export function Module(desc: Partial<ModuleMetaDescriptor> = {}): ClassDecorator {
  return (target: Target) => {
    define<ModuleMetaDescriptor>(NjinnKeys.Module, {
      ...{ imports: [], providers: [], exports: [] },
      ...desc,
    }, target);
    define<TypeProvider>(NjinnKeys.Injectable, {
      scope: Scopes.Default,
      token: target,
      useType: target,
    }, target);
  };
}

export function Injectable(desc: Partial<InjectableMetaDescriptor> = {}): ClassDecorator {
  return (target: Target) => {
    define<TypeProvider>(NjinnKeys.Injectable, {
      scope: desc.scope ?? Scopes.Default,
      token: target,
      useType: target,
    }, target);
  };
}

export function Inject(token: Token): ParameterDecorator {
  return (target: Target, _: Property, index: number) => {
    merge<InjectedMetaParam>(NjinnKeys.Params, { value: token, index }, target);
  };
}
