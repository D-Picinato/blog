export default class ResponseFormat<T> {
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
}
