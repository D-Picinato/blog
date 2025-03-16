import { z } from 'zod';

export type CreatePostSchemaType = z.infer<typeof createPostSchema>;
export const createPostSchema = z.object({
  name: z
    .string({ message: 'O nome é necessário' })
    .min(1, { message: 'O nome é necessário' })
    .max(50, { message: 'O nome deve ter no máximo 50 caracteres' }),
});
