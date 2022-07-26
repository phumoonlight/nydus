import * as jwt from 'jsonwebtoken';
import { ENV } from '@/app.env';

export const generateToken = (payload: any) => {
  const signedToken = jwt.sign(payload, ENV.jwtKey, {
    expiresIn: '1h',
  });
  return signedToken;
};

export const verifyToken = <T = any>(token: string): T => {
  try {
    const decoded: any = jwt.verify(token, ENV.jwtKey);
    return decoded;
  } catch (err) {
    return null;
  }
};
