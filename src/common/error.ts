import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrInvalidRequest extends HttpException {
  constructor(message = 'Invalid request') {
    super(message, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}

export class ErrRecordNotFound extends HttpException {
  constructor(message = 'Record not found') {
    super(message, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}

export class ErrUnauthorized extends HttpException {
  constructor(message = 'Unauthorized') {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}

export class ErrInternalError extends HttpException {
  constructor(message = 'Internal server error') {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
