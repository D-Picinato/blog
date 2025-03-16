import { z } from 'zod';

export type MetaSchemaType = z.infer<typeof metaSchema>;
export const metaSchema = z.object({
  page: z.number().int().optional(),
  perPage: z.number().int().optional(),
  deleted: z.boolean().optional(),
});
