import type { Ctr, ModuleRef, Target } from "../types/njinn.ts";
import type {
  ControllerDescriptor,
  FeatureDescriptor,
  MethodDescriptor,
  MiddlewareMetaDescriptor,
} from "../types/gateway.ts";
import { GatewayApplicationContent } from "../types/gateway.ts";
import moduleRef from "../it/module-ref.ts";
import { readActions, readController, readGateway, readMiddlewares } from "./meta.ts";

const noName = () => (desc: MiddlewareMetaDescriptor) => !desc.name;
const byName = (name: string) => (desc: MiddlewareMetaDescriptor) => name === desc.name;

const getMiddlewares = (target: Target, filterBy = noName()) =>
  readMiddlewares(target)
    .filter(filterBy)
    .map((m) => m.middlewares)
    .flat();

export function setupController(module: ModuleRef, target: Ctr): ControllerDescriptor {
  module.provides.register(target);
  const methods: MethodDescriptor[] = readActions(target).map(
    (action) => ({ ...action, middlewares: getMiddlewares(target, byName(action.name)) }),
  );
  return {
    target,
    prefix: readController(target).prefix,
    middlewares: getMiddlewares(target),
    methods,
  };
}

export default function setup({ host }: GatewayApplicationContent): FeatureDescriptor[] {
  const features: FeatureDescriptor[] = [];
  for (const module of moduleRef(host)) {
    const desc = readGateway(module.ref);
    if (!desc) {
      continue;
    }
    const target = module.ref;
    const prefix = String(desc.prefix);
    const middlewares = getMiddlewares(target);
    const controllers = desc.controllers.map((c: Ctr) => setupController(module, c));
    features.push({ target, prefix, middlewares, controllers, module });
  }
  return features;
}
