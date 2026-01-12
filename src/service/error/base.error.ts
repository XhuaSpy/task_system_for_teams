export type InfoError = { [keys: string]: unknown };

export class BaseError extends Error {
  message: string;
  code: unknown;
  info?: { [keys: string]: unknown };

  constructor(message: string, code: unknown, info?: InfoError) {
    super();

    this.message = message;
    this.code = code;
    if (info) this.info = info;
  }
}
