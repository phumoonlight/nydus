import {
  applyDecorators,
  createParamDecorator,
  SetMetadata,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { verifyIdToken } from './core/firebase/firebase.service';

const ErrUnauthorized = new HttpException(
  'unauthorized',
  HttpStatus.UNAUTHORIZED
);

export const Authorization = createParamDecorator(
  async (_, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const token = req.headers.authorization;
    if (!token) throw ErrUnauthorized;
    const decodedIdToken = await verifyIdToken(token);
    if (!decodedIdToken) throw ErrUnauthorized;
    return decodedIdToken.uid;
  }
);

const AAA = createParamDecorator((_, ctx: ExecutionContext) => {
  console.log('wow');
  const req = ctx.switchToHttp().getRequest();
  const token = req.headers.authorization;
  if (!token) throw ErrUnauthorized;
  if (token !== 'admin') throw ErrUnauthorized;
});

export const AdminAuthorization = () => {
  console.log('first');
  return applyDecorators(SetMetadata('aaaa', true), AAA);
};
