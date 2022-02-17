import { Ctr } from "../core/types/reflect.ts";
import { ModuleRef, Provider, Resolver, Token } from "../core/types/njinn.ts";

export type Providable = Ctr | Provider;
export type Exportable = Ctr | Provider;

// raw data

export interface ModuleDefinition {
  imports: Ctr[];
  providers: Providable[];
  exports: Exportable[];
}

export interface GatewayDefinition extends ModuleDefinition {
  controllers: Ctr[];
}

// generated data

export interface ModuleDescriptor {
  module: Ctr;
  imports: ModuleDefinition[];
  resolvers: Map<Token, Resolver>;
  exports: Map<Token, Resolver>;
}
