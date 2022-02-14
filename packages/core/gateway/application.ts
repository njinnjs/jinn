import ModuleRegistry from "../njinn/module-registry.ts";
import { Logger } from "https://deno.land/std@0.125.0/log/logger.ts";
import { ModuleRef } from "../types/njinn.ts";
import setup from "./setup.ts";
import resolve from "./resolve.ts";
import mount from "./mount.ts";
import { GatewayAdapter } from "./types.ts";

export interface OnSetup {
  onSetup(): void;
}

export interface OnResolve {
  onResolve(): void;
}

export interface OnMount {
  onMount(): void;
}

export interface GatewayApplicationOptions {
  registry: ModuleRegistry;
  logger: Logger;
}

export default class GatewayApplication implements OnSetup, OnResolve, OnMount {
  constructor(
    public readonly host: ModuleRef,
    public readonly adapter: GatewayAdapter,
    public readonly options: GatewayApplicationOptions,
  ) {
  }

  async init() {
    const registry = this.options.registry;
    const adapter = this.adapter;

    const features = setup(this.host);
    this.onSetup();

    const resolved = await resolve({features, registry});
    this.onResolve();

    await mount(adapter, resolved);
    this.onMount();

    // console.log(resolved);
  }

  async listen() {
    await this.adapter.listen({port: 3333, hostname: '0.0.0.0'});
  }

  onSetup() {
  }

  onResolve() {
  }

  onMount() {
  }
}
