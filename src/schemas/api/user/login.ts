import { z } from 'zod';

export type LoginApiSchemaType = z.infer<typeof loginApiSchema>;
export const loginApiSchema = z.object({
  name: z
    .string({ message: 'Insira o nome!' })
    .min(1, { message: 'Insira o nome!' }),
  password: z
    .string({ message: 'Insira a senha!' })
    .min(1, { message: 'Insira a senha!' }),
});
