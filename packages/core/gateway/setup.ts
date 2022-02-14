import type { Ctr, ModuleRef } from "../types/njinn.ts";
import type {
  ControllerDescriptor,
  ControllerMetaDescriptor,
  FeatureDescriptor,
  GatewayMetaDescriptor,
  MethodMetaDescriptor,
  MiddlewareMetaDescriptor,
} from "./types.ts";
import { read } from "../meta/mod.ts";
import moduleRef from "../it/module-ref.ts";
import { GatewayKeys } from "./decorators.ts";

export function setupController(module: ModuleRef, target: Ctr): ControllerDescriptor {
  module.provides.register(target);
  const ctrl = read<ControllerMetaDescriptor>(GatewayKeys.Controller, target);
  const prefix = ctrl.prefix;
  const middlewares = read<MiddlewareMetaDescriptor[]>(GatewayKeys.Middlewares, target, []);
  const methods = read<MethodMetaDescriptor[]>(GatewayKeys.Methods, target, []);
  return { target, prefix, middlewares, methods };
}

export function setupFeature(module: ModuleRef, desc: GatewayMetaDescriptor): FeatureDescriptor {
  const target = module.ref;
  const prefix = String(desc.prefix);
  const middlewares = read<MiddlewareMetaDescriptor[]>(GatewayKeys.Middlewares, target, []);
  const controllers = desc.controllers.map((c) => setupController(module, c));
  return { target, prefix, middlewares, controllers, module };
}

export function readFeature(module: ModuleRef): [ModuleRef, GatewayMetaDescriptor, null | number] {
  const desc = read<GatewayMetaDescriptor>(GatewayKeys.Gateway, module.ref);
  return [module, desc, desc?.controllers.length];
}

export default function setup(host: ModuleRef): FeatureDescriptor[] {
  return [...moduleRef(host)]
    .map(readFeature)
    .filter(([_m, _d, l]) => l)
    .map(([module, desc]) => setupFeature(module, desc));
}
