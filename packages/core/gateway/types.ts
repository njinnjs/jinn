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

export interface GatewayAdapter<Router = Instance, InitOptions = any, StartOptions = any> {
  /**
   * Init application with options
   * @param options
   */
  init(options?: InitOptions): void | Promise<void>;

  /**
   * Construct router from feature descriptor
   * @param routed
   */
  router(routed: Instance): Router;

  /**
   * mount router to application or other feature
   *
   * @param path
   * @param router
   * @param to
   */
  mount(path: string, router: Router, to?: Router): void;

  /**
   * Listen
   * @param options
   */
  listen(options: StartOptions): unknown | Promise<unknown>;
}

// lifecycle

export interface OnSetup {
  onSetup(): void;
}

export interface OnResolve {
  onResolve(): void;
}

export interface OnMount {
  onMount(): void;
}

export interface OnListen {
  onListen(): void;
}
