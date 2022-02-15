import type { Target } from "../types/reflect.ts";
import type {
  ControllerMetaDescriptor,
  GatewayMetaDescriptor,
  MethodMetaDescriptor,
  MiddlewareMetaDescriptor,
} from "../types/gateway.ts";
import { define, merge, read } from "../meta/mod.ts";

export enum GatewayKeys {
  Gateway = "xpr:gateway",
  Controller = "xpr:controller",
  Methods = "xpr:methods",
  Middlewares = "xpr:middlewares",
}

export function readGateway(target: Target) {
  return read<GatewayMetaDescriptor>(GatewayKeys.Gateway, target);
}

export function readController(target: Target) {
  return read<ControllerMetaDescriptor>(GatewayKeys.Controller, target);
}

export function readMiddlewares(target: Target) {
  return read<MiddlewareMetaDescriptor[]>(GatewayKeys.Middlewares, target, []);
}

export function readActions(target: Target) {
  return read<MethodMetaDescriptor[]>(GatewayKeys.Methods, target, []);
}

export function markGateway(target: Target, { prefix, controllers }: GatewayMetaDescriptor) {
  define<GatewayMetaDescriptor>(GatewayKeys.Gateway, {
    prefix: prefix ?? "",
    controllers,
  }, target);
}

export function markController(target: Target, prefix: string) {
  define<ControllerMetaDescriptor>(GatewayKeys.Controller, { prefix }, target);
}

export function markMiddleware(target: Target, mark: MiddlewareMetaDescriptor) {
  merge<MiddlewareMetaDescriptor>(GatewayKeys.Middlewares, mark, target);
}

export function markAction(target: Target, mark: MethodMetaDescriptor) {
  merge<MethodMetaDescriptor>(GatewayKeys.Methods, mark, target);
}
