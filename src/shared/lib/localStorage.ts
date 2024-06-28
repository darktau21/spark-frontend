import { ZodSchema } from 'zod';

class LocalStorage {
  private parse<T>(schema: ZodSchema<T>, value: null | string): T | null {
    if (value === null) return null;
    const parsed = schema.safeParse(JSON.parse(value));
    if (parsed.success) {
      return parsed.data;
    }
    return null;
  }

  public get<T>(key: string, schema: ZodSchema<T>): T | null {
    const value = localStorage.getItem(key);
    return this.parse(schema, value);
  }

  public set<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export const storage = new LocalStorage();
