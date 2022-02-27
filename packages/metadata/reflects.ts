import type { MetadataKey, Target } from "../core/types/reflect.ts";

// has-meta-data
export const hmd = Reflect.hasOwnMetadata;
// get-meta-data
export const gmd = Reflect.getMetadata;
// set-meta-data
export const smd = Reflect.defineMetadata;

export const getAs = <T>(key: MetadataKey, target: Target, defaultValue?: T): T =>
  gmd(key, target) ?? defaultValue as T;
