import { z } from 'zod';
import { metaSchema } from '../utils/meta';

export type ListPostSchemaType = z.infer<typeof listPostSchema>;
export const listPostSchema = z.object({
  search: z.string().optional(),
  userId: z.string().optional(),
  meta: metaSchema,
});
