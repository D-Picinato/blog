import { NextRequest } from 'next/server';
import { ZodType } from 'zod';
import ResponseFormat from '../classes/response-format';

/** Recupera e valida o corpo da requisição */
export default async function getAndValidateQuery<T>(
  req: NextRequest,
  schema: ZodType<T>
) {
  const queryParams = Object.fromEntries(
    new URL(req.url).searchParams.entries()
  );

  const reqParse: T = await (async () => {
    try {
      return JSON.parse(queryParams.params);
    } catch {
      return {};
    }
  })();

  const validatedSchema = schema.safeParse(reqParse);

  return {
    reqData: reqParse,
    validateErrorResponse: validatedSchema.error?.errors
      ? new ResponseFormat(
          400,
          'Há Campos inválidos',
          validatedSchema.error.errors
        ).res()
      : undefined,
  };
}
