import { z } from 'zod';

export type UpdatePostSchemaType = z.infer<typeof updatePostSchema>;
export const updatePostSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'O nome deve ter no máximo 1 caractere' })
    .max(50, { message: 'O nome deve ter no máximo 50 caracteres' })
    .optional(),
});
