import jwt from 'jsonwebtoken';

/** Decodifica o JWT */
export default function verifyJWT<T>(token: string): {
  decoded?: T;
  sessionExpired: boolean;
} {
  try {
    return {
      decoded: jwt.verify(token, process.env.JWT_SECRET_KEY!) as T,
      sessionExpired: false,
    };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError)
      return {
        sessionExpired: true,
      };

    return {
      sessionExpired: false,
    };
  }
}
