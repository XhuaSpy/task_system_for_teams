import { BaseError } from "./base.error.ts";

const DomainErrorDetailCode = {
  INVALID_PASSWORD: "INVALID_PASSWORD",
  INVALID_USERNAME: "INVALID_USERNAME",
};

type DomainErrorDetailCode = (typeof DomainErrorDetailCode)[keyof typeof DomainErrorDetailCode];

const DomainErrorCode = {
  BAD_REQUEST: "BAD_REQUEST",
  NOT_FOUND: "NOT_FOUND",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
} as const;

type DomainErrorCode = (typeof DomainErrorCode)[keyof typeof DomainErrorCode];

interface DomainErrorParams {
  info?: { [key: string]: unknown };
  code: DomainErrorCode; // This DomainErrorCode class is the thing that I wanted
  message: string;
}

export class DomainError extends Error {
  info?: { [key: string]: unknown } | null;
  code: DomainErrorCode;
  message: string;

  constructor(params: DomainErrorParams) {
    super();

    this.code = params.code;
    this.message = params.message;
    this.info = params.info || null;
  }
}

interface Input {
  email?: string;
  password?: string;
}

function execute(input: Input) {
  const { email, password } = input;

  try {
    if (!email || !password) {
      throw new DomainError({
        message: "Must specify email and password",
        code: DomainErrorCode.INTERNAL_SERVER_ERROR,
        info: {
          detailCode: DomainErrorDetailCode.INVALID_PASSWORD,
        },
      });
    }
  } catch (error) {
    if (!(error instanceof BaseError)) {
      console.log(error);
      return;
    }

    if (error.code === DomainErrorCode.BAD_REQUEST) console.log("Pene1");
    if (error.code === DomainErrorCode.INTERNAL_SERVER_ERROR) console.log("Pene2");
    if (error.code === DomainErrorCode.NOT_FOUND) console.log("Pene3");
  }
}

try {
  execute({});
} catch (error) {
  if (!(error instanceof BaseError)) {
    console.log(error);
  } else {
    if (error.code === DomainErrorCode.BAD_REQUEST) console.log("Pene1");
    if (error.code === DomainErrorCode.INTERNAL_SERVER_ERROR) console.log("Pene2");
    if (error.code === DomainErrorCode.NOT_FOUND) console.log("Pene3");
  }
}
