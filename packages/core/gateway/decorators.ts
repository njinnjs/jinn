import type { Ctr, Target } from "../types/njinn.ts";
import type { MetadataKey } from "../types/reflect.ts";
import type { FeatureMetaDescriptor, GatewayMetaDescriptor } from "../types/gateway.ts";
import { markInjectable, markModule, Scopes } from "../njinn/meta.ts";
import { markAction, markController, markGateway, markMiddleware } from "./meta.ts";

export function Feature({ prefix, controllers, middlewares, ...module }: FeatureMetaDescriptor): ClassDecorator {
  return (target: Target) => {
    markModule(target, module);
    markInjectable(target);
    markGateway(target, { prefix, controllers });
    middlewares && markMiddleware(target, { middlewares });
  };
}

export function Gateway(descriptor: GatewayMetaDescriptor): ClassDecorator {
  return (target: Target) => {
    markGateway(target, descriptor);
  };
}

export function Controller(prefix = ""): ClassDecorator {
  return (target: Target) => {
    markController(target, prefix);
    markInjectable(target, { scope: Scopes.Module });
  };
}

export function Middleware(...middlewares: Ctr[]): ClassDecorator & MethodDecorator {
  return (target: Target, name?: MetadataKey) => {
    if (name) {
      markMiddleware(target.constructor, { middlewares, name: String(name) });
    } else {
      markMiddleware(target, { middlewares });
    }
  };
}

export function Get(path = ""): MethodDecorator {
  return (target: Target, name: MetadataKey) => {
    markAction(target.constructor, { path, name: String(name), method: "GET" });
  };
}
