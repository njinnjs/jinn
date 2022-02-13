import { Target } from "jinn/core/njinn/types.ts";

export interface GatewayMetaDescriptor {
  prefix?: string;
  controllers: Target[];
}

export type ControllerMeta = { prefix: string };

export interface MethodDescriptor {
  // HTTP method
  method: string;

  // method name
  name: string;

  // route path
  path: string;

  middlewares: Target[];
}

export interface ControllerDescriptor {
  prefix: string;
  // middlewares: Target[];
  // methods: MethodDescriptor[];
}

export interface ControllerStructure {
}
