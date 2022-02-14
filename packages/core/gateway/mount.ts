import { FeatureHost } from "./hosts.ts";
import { GatewayAdapter } from "./types.ts";

export default async function mount(adapter: GatewayAdapter, features: FeatureHost[]) {
  // todo add options for adapter or should it come configured?!
  await adapter.init();

  for (const feature of features) {
    // create feature
    const router = adapter.router(feature);
    for (const controller of feature.controllers) {
      // crate controller and mount to feature
      adapter.mount(controller.desc.prefix, adapter.router(controller), router);
    }
    // mount feature to application
    adapter.mount(feature.desc.prefix, router);
  }
  return true;
}
