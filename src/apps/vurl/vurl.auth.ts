import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ERR_UNAUTHORIZED } from './vurl.error';

export const Authorization = createParamDecorator(
  (_, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    if (!req.headers.authorization) throw ERR_UNAUTHORIZED;
    // const { authorization: accessToken } = request.headers;
    // try {
    //   const decoded = jwt.verify(accessToken, process.env.JWT_HASH);
    //   return pick(decoded, 'userId');
    // } catch (ex) {
    //   throw new InvalidToken();
    // }
    return req.headers.authorization;
  }
);
