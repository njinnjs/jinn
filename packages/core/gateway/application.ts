import ModuleRegistry from "../njinn/module-registry.ts";
import { Logger } from "https://deno.land/std@0.125.0/log/logger.ts";
import { ModuleRef } from "../types/njinn.ts";
import setup from "./setup.ts";
import resolve from "./resolve.ts";
import mount from "./mount.ts";
import { GatewayAdapter } from "./types.ts";
import { Emitter } from "../../common/emitter/mod.ts";
import { GatewayApplicationContent } from "../types/gateway.ts";

// todo error handler
// todo register global error or system events handlers

export interface GatewayApplicationOptions {
  logger: Logger;
}

export interface GatewayListenOptions {
  [key: string]: string | number;
}

export enum GatewayEvents {
  OnSetup = "setup",
  OnResolve = "resolve",
  OnMount = "mount",
  OnListen = "listen",
  OnShutdown = "shutdown",
}

export default class GatewayApplication<Listen extends GatewayListenOptions = GatewayListenOptions> extends Emitter
  implements GatewayApplicationContent {
  constructor(
    public readonly host: ModuleRef,
    public readonly adapter: GatewayAdapter,
    public readonly registry: ModuleRegistry,
    public readonly options: GatewayApplicationOptions,
  ) {
    super();
  }

  async init() {
    const features = setup(this);
    this.emit(GatewayEvents.OnSetup, features);

    console.log(features[0].controllers);
    const resolved = await resolve(this, features);
    this.emit(GatewayEvents.OnResolve, resolved);

    // const app = await mount(this, resolved);
    // this.emit(GatewayEvents.OnMount, app);
  }

  async listen(options?: Listen) {
    await this.adapter.listen(options);
    this.emit(GatewayEvents.OnListen, options);
  }
}
