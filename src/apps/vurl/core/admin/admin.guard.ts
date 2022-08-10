import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ENV } from '@/app.env';
import { verifyToken } from '@/common/jwt';
import { ErrUnauthorized } from '@/common/error';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const auth = req.headers.authorization;
    const [authType, authToken] = auth.split(' ');
    if (authType !== 'Bearer') {
      throw new ErrUnauthorized();
    }
    const decodedToken = verifyToken(authToken);
    if (!decodedToken) {
      throw new ErrUnauthorized();
    }
    if (decodedToken.key !== ENV.vurlAdminAuthKey) {
      throw new ErrUnauthorized();
    }
    return true;
  }
}
