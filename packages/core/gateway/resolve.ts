import type { LinkerRegistry, ModuleRef, Token } from "../types/njinn.ts";
import type { ControllerDescriptor, FeatureDescriptor, RoutedDescriptor } from "../types/gateway.ts";
import { ControllerHost, FeatureHost } from "./hosts.ts";
import GatewayApplication from "./application.ts";

export interface ResolveOptions {
  registry: LinkerRegistry;
  features: FeatureDescriptor[];
}

// function* mw(r: RoutedDescriptor): Generator<[Token, string?]> {
//   for (const { name, middlewares } of r.middlewares) {
//     for (const w of middlewares) {
//       yield [w, name];
//     }
//   }
// }

export async function resolveController(controller: ControllerDescriptor, ref: ModuleRef): Promise<ControllerHost> {
  const ctr = new ControllerHost(
    controller,
    await ref.resolve(controller.target),
  );

  // for (const [middleware, name] of mw(controller)) {
  //   ctr.middleware = [await ref.resolve(middleware), name];
  // }

  for (const method of controller.methods) {
    ctr.method = [method, Reflect.getMetadata("design:paramtypes", ctr.instance, method.name)];
  }
  return ctr;
}

export async function resolveFeature(feature: FeatureDescriptor, ref: ModuleRef): Promise<FeatureHost> {
  const feat = new FeatureHost(
    feature,
    await ref.resolve(feature.target),
  );

  // for (const [middleware, name] of mw(feature)) {
  //   feat.middleware = [await ref.resolve(middleware), name];
  // }

  for (const controller of feature.controllers) {
    feat.controller = await resolveController(controller, ref);
  }

  return feat;
}

export default function resolve({ registry }: GatewayApplication, features: FeatureDescriptor[]) {
  return Promise.all(features.map((feature) => resolveFeature(feature, registry.fetch(feature.target))));
}