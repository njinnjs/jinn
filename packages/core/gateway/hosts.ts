import {
  Controlled,
  ControllerDescriptor,
  FeatureDescriptor,
  GatewayMiddleware,
  Routed,
  RoutedDescriptor,
} from "./types.ts";
import { Instance } from "../types/reflect.ts";

export abstract class RoutedHost<Descriptor extends RoutedDescriptor> implements Routed<Descriptor> {
  readonly middlewares: [GatewayMiddleware, string?][] = [];

  constructor(public readonly desc: Descriptor, public readonly instance: Instance) {
  }

  set middleware([m, name]: [GatewayMiddleware, string?]) {
    this.middlewares.push([m, name]);
  }
}

export class MethodHost extends RoutedHost<RoutedDescriptor> {

}

export class ControllerHost extends RoutedHost<ControllerDescriptor> {
  methods: MethodHost[] = [];
}

export class FeatureHost extends RoutedHost<FeatureDescriptor> implements Controlled {
  readonly controllers: ControllerHost[] = [];

  set controller(c: ControllerHost) {
    this.controllers.push(c);
  }
}
