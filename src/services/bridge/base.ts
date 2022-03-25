import * as BTCAClient from 'btca-client';
import Result from './type/results';
import { JSBRequest } from './type/base';

export default class JSBBase {
  private readonly btca: any;

  constructor() {
    this.btca = new BTCAClient({
      handle: 'global-services', // unqiue handle to identify BTCA
      cache: false, // caches requests (useful for debugging)
      disableEvents: false, // disables default events (see below)
      log: false, // logs actions to console
    });
  }

  protected doCall<T>(request: JSBRequest) {
    return new Promise<Result<T>>((resolve) => {
      this.btca.send(
        request,
        (response: T, requestId: string, error: unknown) => {
          resolve(new Result<T>(response, requestId, error));
        }
      );
    });
  }
}
