import { MongooseModuleOptions } from '@nestjs/mongoose';
import { ENV } from '@/app.env';
import { SchemaTimestampsConfig, ToObjectOptions } from 'mongoose';

export const MONGO_MODULE_OPTIONS: MongooseModuleOptions = {
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

export const MONGO_SCHEMA_TIMESTAMP_CONFIG: SchemaTimestampsConfig = {
  createdAt: 'created_at',
  updatedAt: 'updated_at',
};

export const MONGO_SCHEMA_TO_JSON_OPTIONS: ToObjectOptions = {
  virtuals: true,
  versionKey: true,
  transform: (_, ret) => {
    delete ret._id;
  },
};
