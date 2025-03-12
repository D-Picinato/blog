/** Recupera o JSON do body da requisição */
export default async function getReqBody<T>(req: Request): Promise<T> {
  try {
    return JSON.parse(await req.text());
  } catch {
    return {} as T;
  }
}
