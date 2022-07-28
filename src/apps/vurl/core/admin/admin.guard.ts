import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ENV } from '@/app.env';
import { verifyToken } from '@/common/jwt';
import { ERR_HTTP_UNAUTHORIZED } from '@/common/error';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const auth = req.headers.authorization;
    const [authType, authToken] = auth.split(' ');
    if (authType !== 'Bearer') {
      throw ERR_HTTP_UNAUTHORIZED;
    }
    const decodedToken = verifyToken(authToken);
    if (!decodedToken) {
      throw ERR_HTTP_UNAUTHORIZED;
    }
    if (decodedToken.key !== ENV.vurlAdminAuthKey) {
      throw ERR_HTTP_UNAUTHORIZED;
    }
    return true;
  }
}
