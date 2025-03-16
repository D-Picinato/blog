import ResponseMeta from './response-meta';

export default class ResponseList<T> {
  constructor(public list: T, public meta: ResponseMeta) {}
}
