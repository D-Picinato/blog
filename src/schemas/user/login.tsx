import { z } from 'zod';

export type LoginSchemaType = z.infer<typeof loginSchema>;
export const loginSchema = z.object({
  name: z
    .string({ message: 'Insira o nome' })
    .min(1, { message: 'Insira o nome' }),
  password: z
    .string({ message: 'Insira a senha' })
    .min(1, { message: 'Insira a senha' }),
});
