import { z } from 'zod';

export const registerSchema = z.object({
  name: z
    .string({ message: 'Nome é obrigatório' })
    .min(3, { message: 'Nome deve ter no mínimo 3 caracteres' })
    .max(25, { message: 'Nome deve ter no máximo 25 caracteres' }),
  password: z
    .string({ message: 'Senha é obrigatória' })
    .min(6, { message: 'Senha deve possuir no mínimo 6 caracteres' })
    .max(25, { message: 'Senha deve possuir no máximo 25 caracteres' }),
  passwordConfirmation: z
    .string({ message: 'A confirmação de senha é obrigatória' })
    .min(6, { message: 'Senha deve possuir no mínimo 6 caracteres' })
    .max(25, { message: 'Senha deve possuir no máximo 25 caracteres' }),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;
