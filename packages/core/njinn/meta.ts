import { Target } from "../reflection/reflection.ts";
import {
  Ctr,
  InjectableMetaDescriptor,
  InjectedMetaParam,
  ModuleMetaDescriptor,
  Provider,
  Token,
  TypeProvider,
} from "../types/njinn.ts";
import { define, merge, read } from "../meta/mod.ts";

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

export function readModule(target: Target) {
  return read<ModuleMetaDescriptor>(NjinnKeys.Module, target);
}

export function readInjectable(target: Target) {
  return read<Provider>(NjinnKeys.Injectable, target);
}

export function readCtrParams(target: Target): Token[] {
  const params: Token[] = read<Ctr[]>(NjinnKeys.Ctr, target, []);
  if (params.length) {
    const injected = read<InjectedMetaParam[]>(NjinnKeys.Params, target, []);
    if (injected.length) {
      for (const { index, value } of injected) {
        params[index] = value;
      }
    }
  }
  return params;
}

export function markModule(target: Target, mark: Partial<ModuleMetaDescriptor>) {
  define<ModuleMetaDescriptor>(NjinnKeys.Module, {
    ...{ imports: [], providers: [], exports: [] },
    ...mark,
  }, target);
}

export function markInjectable(target: Target, mark?: Partial<InjectableMetaDescriptor>) {
  define<TypeProvider>(NjinnKeys.Injectable, {
    scope: mark?.scope ?? Scopes.Default,
    token: target,
    useType: target,
  }, target);
}

export function markInject(target: Target, token: Token, index: number) {
  merge<InjectedMetaParam>(NjinnKeys.Params, { value: token, index }, target);
}
