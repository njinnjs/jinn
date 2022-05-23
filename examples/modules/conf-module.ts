import { defineModule, provideType, provideValue } from "../../packages/elf/jinn.ts";

export const CONF_TOKEN = Symbol("conf-token");

export class ConfService {
  constructor(private readonly conf: Map<string, unknown>) {
  }

  get<T = unknown>(key: string, defaultValue?: T): T | undefined {
    return this.conf.has(key) ? this.conf.get(key) as T : defaultValue;
  }
}

export class ConfModule {
}

defineModule(ConfModule, {
  providers: [
    provideValue(CONF_TOKEN, new Map()),
    provideType(ConfService, CONF_TOKEN),
  ],
});
