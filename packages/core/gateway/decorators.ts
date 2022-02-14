import type { Ctr, Target, TypeProvider } from "../types/njinn.ts";
import type { Instance, MetadataKey } from "../types/reflect.ts";
import type {
  ControllerMetaDescriptor,
  GatewayMetaDescriptor,
  MethodMetaDescriptor,
  MiddlewareMetaDescriptor,
} from "./types.ts";
import { define, merge } from "../meta/mod.ts";
import { NjinnKeys, Scopes } from "../njinn/decorators.ts";

export enum GatewayKeys {
  Gateway = "xpr:gateway",
  Controller = "xpr:controller",
  Methods = "xpr:methods",
  Middlewares = "xpr:middlewares",
}

type TPD = TypedPropertyDescriptor<Instance>;

export function Gateway({ prefix, controllers }: GatewayMetaDescriptor): ClassDecorator {
  return (target: Target) => {
    define<GatewayMetaDescriptor>(GatewayKeys.Gateway, {
      prefix: prefix ?? "",
      controllers,
    }, target);
  };
}

export function Controller(prefix = ""): ClassDecorator {
  return (target: Target) => {
    define<ControllerMetaDescriptor>(GatewayKeys.Controller, { prefix }, target);
    define<TypeProvider>(NjinnKeys.Injectable, {
      scope: Scopes.Module,
      token: target,
      useType: target,
    }, target);
  };
}

export function Middleware(...middlewares: Ctr[]): ClassDecorator & MethodDecorator {
  return (target: Target, name?: MetadataKey, descriptor?: TPD) => {
    if (name && descriptor) {
      merge<MiddlewareMetaDescriptor>(GatewayKeys.Middlewares, { name: String(name), middlewares }, target.constructor);
      merge<MiddlewareMetaDescriptor>(GatewayKeys.Middlewares, { name: String(name), middlewares }, descriptor.value);
    } else {
      merge<MiddlewareMetaDescriptor>(GatewayKeys.Middlewares, { middlewares }, target);
    }
  };
}

export function Get(path = ""): MethodDecorator {
  return (target: Target, name: MetadataKey, descriptor: TPD) => {
    merge<MethodMetaDescriptor>(GatewayKeys.Methods, { path, name: String(name), method: 'GET' }, descriptor.value);
    merge<MethodMetaDescriptor>(GatewayKeys.Methods, { path, name: String(name), method: 'GET' }, target.constructor);
  };
}

//
// export function Post(path = ""): MethodDecorator {
//   return (target: Target, propertyKey: string | symbol) => {
//     addMethod(target, { method: "POST", name: String(propertyKey), path });
//   };
// }
//
// export function Put(path = ""): MethodDecorator {
//   return (target: Target, propertyKey: string | symbol) => {
//     addMethod(target, { method: "PUT", name: String(propertyKey), path });
//   };
// }
//
// export function Delete(path = ""): MethodDecorator {
//   return (target: Target, propertyKey: string | symbol) => {
//     addMethod(target, { method: "DELETE", name: String(propertyKey), path });
//   };
// }
