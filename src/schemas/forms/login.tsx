import { z } from 'zod';

export const loginFormSchema = z.object({
  name: z
    .string({ message: 'Insira o nome' })
    .min(1, { message: 'Insira o nome' }),
  password: z
    .string({ message: 'Insira a senha' })
    .min(1, { message: 'Insira a senha' }),
});

export type LoginFormSchemaType = z.infer<typeof loginFormSchema>;
