import { Ctr } from '../core/types/reflect.ts';
import { Provider, Token } from '../core/types/njinn.ts';

export type ProviderOrCtr = Provider | Ctr;
export type TokenOrProviderOrCtr = Token | ProviderOrCtr;

export interface ModuleMetadata {
  imports: Ctr[];
  providers: ProviderOrCtr[];
  exports: TokenOrProviderOrCtr[];
}

export interface ModuleDescriptor {
  imports: ModuleDescriptor[];
  providers: unknown[];
  exports: unknown[];
}
