import { z } from 'zod';

export const loginSchema = z.object({
  name: z.string({ message: 'Insira o nome' }),
  password: z.string({ message: 'Insira a senha' }),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
