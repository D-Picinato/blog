import { z } from 'zod';

export const loginSchema = z.object({
  name: z
    .string({ message: 'Nome é obrigatório' })
    .min(3, { message: 'Nome deve ter no mínimo 3 caracteres' })
    .max(50, { message: 'Nome deve ter no máximo 50 caracteres' }),
  password: z
    .string({ message: 'Senha é obrigatória' })
    .min(6, { message: 'Senha deve possuir no mínimo 6 caracteres' })
    .max(25, { message: 'Senha deve possuir no máximo 25 caracteres' }),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
