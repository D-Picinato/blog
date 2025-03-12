import { z } from 'zod';

export type CreateUserApiSchemaType = z.infer<typeof createUserApiSchema>;
export const createUserApiSchema = z.object({
  name: z
    .string({ message: 'O nome é obrigatório!' })
    .min(3, { message: 'O nome deve possuir no mínimo 3 caracteres!' })
    .max(25, { message: 'O nome deve possuir no máximo 25 caracteres!' }),
  password: z
    .string({ message: 'A senha é obrigatória!' })
    .min(8, { message: 'A senha deve possuir no mínimo 8 caracteres!' })
    .max(25, { message: 'A senha deve possuir no máximo 25 caracteres!' })
    .regex(/[0-9]/, {
      message: 'A senha deve possuir pelo menos um número!',
    })
    .regex(/[A-Z]/, {
      message: 'A senha deve possuir pelo menos uma letra maíscula!',
    })
    .regex(/[a-z]/, {
      message: 'A senha deve possuir pelo menos uma letra minúscula!',
    }),
});
