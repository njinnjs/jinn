export class ConfigService {
  constructor(private readonly data: Map<string, unknown>) {
  }

  get<T>(key: string, defaultValue?: T): T {
    return (this.data.has(key) ? this.data.get(key) : defaultValue) as T;
  }
}
