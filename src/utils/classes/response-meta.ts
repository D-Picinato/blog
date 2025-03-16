export default class ResponseMeta {
  public totalPages?: number;

  constructor(
    public totalRecords: number,
    public page: number,
    public perPage?: number
  ) {
    this.totalPages = perPage ? totalRecords / perPage : undefined;
  }
}
