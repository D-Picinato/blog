import { ZodType } from 'zod';

/** Valida o schema e retorna os erros */
export default function validateSchema<T extends ZodType>(
  schema: T,
  data: unknown
) {
  const validation = schema.safeParse(data);
  return { errors: validation.error?.errors };
}
