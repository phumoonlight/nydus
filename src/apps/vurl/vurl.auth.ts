import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ErrUnauthorized } from '@/common/error';
import { verifyIdToken } from './core/firebase/firebase.service';
import { ENV } from '@/app.env';

export const Auth = createParamDecorator(async (_, ctx: ExecutionContext) => {
  if (ENV.vurlMockUserId) return ENV.vurlMockUserId;
  const req = ctx.switchToHttp().getRequest();
  const token = req.headers.authorization;
  if (!token) throw new ErrUnauthorized();
  const decodedToken = await verifyIdToken(token);
  if (!decodedToken) throw new ErrUnauthorized();
  return decodedToken.sub;
});
