import { readFile } from 'fs';
import { config } from 'dotenv';

config();

const cache = {
  version: '',
};

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
  vurlMockUserId: process.env.APP_VURL_MOCK_USER_ID || '',
};

export const getVersion = () => {
  return new Promise((resolve) => {
    if (cache.version) {
      resolve(cache.version);
    }
    readFile('version.txt', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        resolve('unknown');
        return;
      }
      cache.version = data;
      resolve(data);
    });
  });
};
