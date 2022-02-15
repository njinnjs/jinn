import type {
  Controlled,
  ControllerDescriptor,
  FeatureDescriptor,
  GatewayMiddleware,
  MethodMetaDescriptor,
  Routed,
  RoutedDescriptor,
} from "../types/gateway.ts";
import type { Instance } from "../types/reflect.ts";

export abstract class RoutedHost<Descriptor extends RoutedDescriptor> implements Routed<Descriptor> {
  readonly middlewares: [GatewayMiddleware, string?][] = [];

  constructor(public readonly desc: Descriptor, public readonly instance: Instance) {
  }

  set middleware([m, name]: [GatewayMiddleware, string?]) {
    this.middlewares.push([m, name]);
  }
}

export class ControllerHost extends RoutedHost<ControllerDescriptor> {
  readonly methods: [MethodMetaDescriptor, unknown][] = [];

  set method([desc, params]: [MethodMetaDescriptor, unknown]) {
    this.methods.push([desc, params]);
  }
}

export class FeatureHost extends RoutedHost<FeatureDescriptor> implements Controlled {
  readonly controllers: ControllerHost[] = [];

  set controller(c: ControllerHost) {
    this.controllers.push(c);
  }
}
