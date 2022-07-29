import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ENV } from '@/app.env';
import { routes } from './vurl.routes';
import { vurlConfig } from './vurl.config';
import { FirebaseModule } from './core/firebase/firebase.module';
import { ImageModule } from './core/image/image.module';
import { LinkModule } from './core/link/link.module';
import { LinkGroupModule } from './core/linkgroup/linkgroup.module';
import { AdminModule } from './core/admin/admin.module';
import { UserModule } from './core/user/user.module';
import { UserAdminModule } from './core/user/admin/user.admin.module';

@Module({
  imports: [
    MongooseModule.forRoot(ENV.vurlMongoConn, vurlConfig.mongooseOptions),
    RouterModule.register(routes),
    FirebaseModule,
    ImageModule,
    LinkModule,
    LinkGroupModule,
    AdminModule,
    UserModule,
    UserAdminModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class VurlModule {}
