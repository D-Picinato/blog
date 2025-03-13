import { NextResponse } from 'next/server';

export default class ResponseFormat<T = undefined> {
  success: boolean;
  status: number;
  message: string;
  data?: T;

  constructor(status: number, message: string, data?: T) {
    this.success = status < 400;
    this.status = status;
    this.message = message;
    this.data = data;
  }

  /** Retorna uma resposta estruturada do Next */
  res = (nextResponse?: ResponseInit) =>
    NextResponse.json(this, { status: this.status, ...nextResponse });
}
