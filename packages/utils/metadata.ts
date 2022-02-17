import type { MetadataKey, Target } from "../core/reflection/reflection.ts";

export function getMeta<T = unknown>(key: MetadataKey, target: Target, defaultValue?: T): T {
  return (Reflect.getMetadata(key, target) ?? defaultValue) as T;
}

export function setMeta<T = unknown>(key: MetadataKey, value: T, target: Target): T {
  Reflect.defineMetadata(key as string, value, target);
  return value;
}

export function addMeta<T = unknown>(key: MetadataKey, value: T, target: Target) {
  const list = [...getMeta<T[]>(key, target, []), value];
  setMeta<T[]>(key, list, target);
}
