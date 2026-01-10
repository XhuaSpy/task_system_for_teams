import { BaseError, type InfoError } from "../base.error.ts";

const DomainErrorDetailCode = {
  INVALID_PASSWORD: "INVALID_PASSWORD",
  INVALID_USERNAME: "INVALID_USERNAME",
  INVALID_GMAIL: "INVALID_GMAIL",
};

const DomainErrorCode = {
  BAD_REQUEST: "BAD_REQUEST",
  NOT_FOUND: "NOT_FOUND",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
} as const;

export type DomainErrorDetailCode =
  (typeof DomainErrorDetailCode)[keyof typeof DomainErrorDetailCode];

export type DomainErrorCode = (typeof DomainErrorCode)[keyof typeof DomainErrorCode];

interface DomainErrorParams {
  code: DomainErrorCode;
  message: string;
  info?: InfoError;
}

export class DomainError extends BaseError {
  constructor(params: DomainErrorParams) {
    super(params.code, params.message);

    if (params.info) this.info = params.info;
  }
}
