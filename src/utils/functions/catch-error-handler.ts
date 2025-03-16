import ResponseFormat from '@/utils/classes/response-format';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NextResponse } from 'next/server';

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
): NextResponse<ResponseFormat<Record<string, unknown> | undefined>> {
  // Retorno caso o error for do Prisma
  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      // Violação de unicidade
      case 'P2002':
        return new ResponseFormat(
          409,
          options?.messageP2002 || 'Credenciais já cadastradas',
          error.meta
        ).res();

      // Registro não encontrado
      case 'P2025':
        return new ResponseFormat(
          404,
          options?.messageP2025 || 'Registro não encontrado'
        ).res();
    }
  }

  // Retorno de erro padrão
  console.error(error);
  return new ResponseFormat(500, 'Erro interno no servidor').res();
}
