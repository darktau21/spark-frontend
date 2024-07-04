import { ZodSchema, z } from 'zod';

const storageSchema = z.object({
  authToken: z.string(),
  rememberMe: z.boolean(),
});

type StorageSchema = z.infer<typeof storageSchema>;

const STORAGE_KEY = 'auth_storage';

class LocalStorage {
  private getStorage(): StorageSchema | null {
    const storage = localStorage.getItem(STORAGE_KEY);
    if (!storage) {
      return null;
    }
    const parsed = storageSchema.safeParse(JSON.parse(storage));
    if (parsed.success) {
      return parsed.data;
    }
    return null;
  }

  public get<K extends keyof StorageSchema>(key: K): StorageSchema[K] | null {
    const storage = this.getStorage();
    return storage ? storage[key] : null;
  }

  public set<K extends keyof StorageSchema>(key: K, value: StorageSchema[K]): void {
    const storage: StorageSchema = this.getStorage() ?? {
      authToken: '',
      rememberMe: false,
    };

    storage[key] = value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
  }
}

export const storage = new LocalStorage();
