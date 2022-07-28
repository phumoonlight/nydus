import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ERR_HTTP_UNAUTHORIZED } from '@/common/error';
import { verifyIdToken } from './core/firebase/firebase.service';

export const Authorization = createParamDecorator(
  async (_, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const token = req.headers.authorization;
    if (!token) throw ERR_HTTP_UNAUTHORIZED;
    const decodedIdToken = await verifyIdToken(token);
    if (!decodedIdToken) throw ERR_HTTP_UNAUTHORIZED;
    return decodedIdToken.uid;
  }
);
