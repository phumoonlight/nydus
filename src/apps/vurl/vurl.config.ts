import { MongooseModuleOptions } from '@nestjs/mongoose';
import { ENV } from '@/app.env';

const mongooseOptions: MongooseModuleOptions = {
  dbName: 'mongo',
  authSource: '$external',
  authMechanism: 'MONGODB-X509',
  w: 'majority',
  retryWrites: true,
  ssl: true,
  sslValidate: true,
  sslKey: ENV.vurlMongoCertPath,
  sslCert: ENV.vurlMongoCertPath,
};

export const vurlConfig = {
  mongooseOptions,
};
