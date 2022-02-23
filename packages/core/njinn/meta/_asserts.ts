import { Ctr } from '../../types/reflect.ts';
import { readModule } from '../meta.ts';
import { AnyProvider, Token } from '../../types/njinn.ts';
import { assert } from 'https://deno.land/std@0.125.0/testing/asserts.ts';

export const isModule = (ctr: unknown) => !!readModule(ctr as Ctr);
export const isProvider = (p: AnyProvider | Ctr) => typeof p === "function" || p.token;
export const isExports = (e: AnyProvider | Ctr | Token) => isModule(e as Ctr) || isProvider(e as Ctr | AnyProvider);

export const assertImports = (imports: unknown[]) => imports.forEach(i => assert(isModule(i), `unable to import ${String(i)}`));

// export const assertProviders = (providers: unknown[]) =>
