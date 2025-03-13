import ResponseFormat from '@/utils/classes/response-format';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export interface CatchErrorHandlerOptions {
  /** Violação de unicidade */
  messageP2002?: string;
  /** Registro não encontrado */
  messageP2025?: string;
}

/** Handler para erro interno na requisição */
export default function catchErrorHandler(
  error: unknown,
  options?: CatchErrorHandlerOptions
) {
  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return new ResponseFormat(
          409,
          options?.messageP2002 || 'Credenciais já cadastradas',
          error.meta
        );
      case 'P2025':
        return new ResponseFormat(
          404,
          options?.messageP2025 || 'Registro não encontrado'
        );
    }
  }

  console.error(error);
  return new ResponseFormat(500, 'Erro interno no servidor');
}
