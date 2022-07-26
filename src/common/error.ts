import { HttpException, HttpStatus } from '@nestjs/common';

export const HTTP_UNAUTHORIZED = new HttpException(
  'unauthorized',
  HttpStatus.UNAUTHORIZED
);
