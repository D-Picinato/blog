import jwt from 'jsonwebtoken';

class FnResponse<T> {
  decoded?: T;
  sessionExpired: boolean;

  constructor({ decoded, sessionExpired }: FnResponse<T>) {
    this.decoded = decoded;
    this.sessionExpired = sessionExpired;
  }
}

/** Decodifica o JWT */
export default function verifyJWT<T>(token: string): FnResponse<T> {
  try {
    // Retorno caso o token for válido
    return new FnResponse<T>({
      decoded: jwt.verify(token, process.env.JWT_SECRET_KEY!) as T,
      sessionExpired: false,
    });
  } catch (error) {
    // Retorno caso o token tiver expirado
    if (error instanceof jwt.TokenExpiredError)
      return new FnResponse({
        sessionExpired: true,
      });

    // Retorno inválido padrão
    return {
      sessionExpired: false,
    };
  }
}
