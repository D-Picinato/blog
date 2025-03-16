import { z } from 'zod';

export type CreateUserSchemaType = z.infer<typeof createUserSchema>;
export const createUserSchema = z.object({
  name: z
    .string({ message: 'Nome é obrigatório' })
    .min(3, { message: 'Nome deve ter no mínimo 3 caracteres' })
    .max(25, { message: 'Nome deve ter no máximo 25 caracteres' }),
  password: z
    .string({ message: 'Senha é obrigatória' })
    .min(8, { message: 'Senha deve ter no mínimo 8 caracteres' })
    .max(25, { message: 'Senha deve ter no máximo 25 caracteres' })
    .regex(/[0-9]/, {
      message: 'A senha deve ter pelo menos um número',
    })
    .regex(/[A-Z]/, {
      message: 'A senha deve ter pelo menos uma letra maíscula',
    })
    .regex(/[a-z]/, {
      message: 'A senha deve ter pelo menos uma letra minúscula',
    }),
  passwordConfirmation: z
    .string({ message: 'A confirmação de senha é obrigatória' })
    .min(1, { message: 'A confirmação de senha é obrigatória' }),
});
