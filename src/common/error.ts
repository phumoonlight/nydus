import { HttpException, HttpStatus } from '@nestjs/common';

export const ERR_HTTP_UNAUTHORIZED = new HttpException(
  'unauthorized',
  HttpStatus.UNAUTHORIZED
);
