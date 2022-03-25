import { Nullable } from '../../../type';

export default class Result<T> {
  private readonly requestId: string;

  public value: Nullable<T>;

  public error: any;

  constructor(value: Nullable<T>, requestId: string, error?: any) {
    this.value = value;
    this.requestId = requestId;
    this.error = error;
  }

  public get hasError(): boolean {
    if (typeof this.error === 'undefined' || this.error === null) {
      return false;
    }
    return true;
  }

  public get getRequestId(): string {
    return this.requestId;
  }
}
