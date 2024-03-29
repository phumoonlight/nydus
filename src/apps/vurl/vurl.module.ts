import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ENV } from '@/app.env';
import { routes } from './vurl.routes';
import { MONGO_MODULE_OPTIONS } from './vurl.config';
import { FirebaseModule } from './core/firebase/firebase.module';
import { ImageModule } from './core/image/image.module';
import { LinkModule } from './core/link/link.module';
import { LinkGroupModule } from './core/linkgroup/linkgroup.module';
import { AdminModule } from './core/admin/admin.module';

@Module({
  imports: [
    MongooseModule.forRoot(ENV.vurlMongoConn, MONGO_MODULE_OPTIONS),
    RouterModule.register(routes),
    FirebaseModule,
    ImageModule,
    LinkModule,
    LinkGroupModule,
    AdminModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class VurlModule {}
