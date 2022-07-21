import { HttpException, HttpStatus } from '@nestjs/common';

export const ERR_UPLOAD_IMAGE = new HttpException(
  'upload_image_failed',
  HttpStatus.INTERNAL_SERVER_ERROR
);

export const ERR_UNAUTHORIZED = new HttpException(
  'unauthorized',
  HttpStatus.UNAUTHORIZED
);
