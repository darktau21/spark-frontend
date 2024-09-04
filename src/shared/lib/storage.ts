import { z } from 'zod';

const storageSchema = z.object({
  authToken: z.string(),
  rememberMe: z.boolean(),
  testResults: z.array(z.number()),
});

type StorageSchema = z.infer<typeof storageSchema>;
type StorageSchemaKey = keyof StorageSchema;

class LocalStorage {
  public clear() {
    localStorage.clear();
  }

  public get<K extends StorageSchemaKey>(key: K): StorageSchema[K] | null {
    const item = localStorage.getItem(key);
    if (item === null) return null;

    const value = storageSchema.shape[key].safeParse(JSON.parse(item));
    if (value.success) {
      return value.data as StorageSchema[K];
    }
    return null;
  }

  public remove<K extends StorageSchemaKey>(key: K): void {
    localStorage.removeItem(key);
  }

  public set<K extends StorageSchemaKey>(key: K, value: StorageSchema[K]): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export const storage = new LocalStorage();
