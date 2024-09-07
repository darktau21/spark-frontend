import { DataUrl } from '@/shared/lib';
import { z } from 'zod';

export const certificateSchema = z.object({
  id: z.number(),
  certificate: z.string(),
});

export const certificatePayload = z.object({
  certificate: z.custom(
    (file) => {
      return (
        (file instanceof DataUrl && !file.size) ||
        (file instanceof DataUrl && (file.size ?? Number.MAX_SAFE_INTEGER) <= 8 * 1024 * 1024)
      );
    },
    {
      message: 'Максимальный размер файла 8МБ',
    }
  ),
});

export const certificateList = z.array(certificateSchema);
