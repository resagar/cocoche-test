import httpStatus from 'http-status';
export abstract class BaseError extends Error {
  constructor(public statusCode: number, public message: string, public description: string) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = Error.name;
    Error.captureStackTrace(this);
  }
}

export class BadRequestError extends BaseError {
  constructor(message: string, description: string) {
    super(httpStatus.BAD_REQUEST, message, description);
  }
}

export class NotFoundError extends BaseError {
  constructor(message: string, description: string) {
    super(httpStatus.NOT_FOUND, message, description);
  }
}

export class IntenalServerError extends BaseError {
  constructor(message: string, description: string) {
    super(httpStatus.INTERNAL_SERVER_ERROR, message, description);
  }
}
