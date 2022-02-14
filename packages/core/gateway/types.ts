import type { Ctr, Instance } from "../types/reflect.ts";
import { ModuleRef } from "../types/njinn.ts";
import { ControllerHost } from "./hosts.ts";

export interface GatewayContext<Req = Instance, Res = Instance> {
  request: Req;
  response: Res;

  [key: string]: unknown;
}

export interface GatewayMiddleware {
  handle(ctx: GatewayContext): Promise<GatewayContext> | GatewayContext;
}

// metadata descriptors
export type GatewayMetaDescriptor = { prefix?: string; controllers: Ctr[] };
export type MiddlewareMetaDescriptor = { middlewares: Ctr[]; instances?: Instance[]; name?: string };
export type ControllerMetaDescriptor = { prefix: string };
export type MethodMetaDescriptor = { path: string; name: string; method: string };

// descriptors
export interface RoutedDescriptor {
  target: Ctr;
  prefix: string;
  middlewares: MiddlewareMetaDescriptor[];
}

export interface ControllerDescriptor extends RoutedDescriptor {
  methods: MethodMetaDescriptor[];
}

export interface FeatureDescriptor extends RoutedDescriptor {
  module: ModuleRef;
  controllers: ControllerDescriptor[];
}

// hosts

export interface Routed<Descriptor extends RoutedDescriptor> {
  readonly middlewares: [GatewayMiddleware, string?][];
  readonly desc: Descriptor;
  readonly instance: Instance;
}

export interface Controlled {
  readonly controllers: ControllerHost[];
}

// adapter

export interface GatewayRouter<T = unknown> {
  use(path: string, router: GatewayRouter): void;
}

export interface GatewayAdapter<Router = Instance> {
  init(): void | Promise<void>;

  router(routed: Instance): Router;

  mount(path: string, router: Router, to?: Router): void;

  listen(...args: Instance[]): any | Promise<any>;

}
