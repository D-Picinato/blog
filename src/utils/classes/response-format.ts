import { NextResponse } from 'next/server';

export default class ResponseFormat<T = undefined> {
  public success: boolean;

  constructor(public status: number, public message: string, public data?: T) {
    this.success = this.status < 400;
  }

  /** Retorna uma resposta estruturada do Next */
  res = (nextResponse?: ResponseInit) =>
    NextResponse.json(this, { status: this.status, ...nextResponse });
}
