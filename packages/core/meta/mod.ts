import type { MetadataKey, Target } from "../types/reflect.ts";

export function merge<T = unknown>(key: MetadataKey, value: T, target: Target) {
  const list = [...read<T[]>(key, target, []), value];
  define<T[]>(key, list, target);
}

export function define<T = unknown>(key: MetadataKey, value: T, target: Target) {
  Reflect.defineMetadata(key as string, value, target);
}

export function read<T = unknown>(key: MetadataKey, target: Target, defaultValue?: T): T {
  return (Reflect.getMetadata(key, target) ?? defaultValue) as T;
}
