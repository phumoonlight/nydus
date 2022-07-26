import { config } from 'dotenv';

config();

export const ENV = {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
  jwtKey: process.env.JWT_KEY || 'my-secret-key',
  // vurl
  vurlMongoConn: process.env.APP_VURL_MONGO_CONN,
  vurlMongoCertPath: process.env.APP_VURL_MONGO_CERT_PATH,
  vurlFirebaseCertPath: process.env.APP_VURL_FIREBASE_CERT_PATH,
  vurlFirebaseStorageBucketName:
    process.env.APP_VURL_FIREBASE_STORAGE_BUCKET_NAME,
  vurlAdminAuthKey: process.env.APP_VURL_ADMIN_AUTH_KEY || 'admin',
};
