import { Module } from '@nestjs/common';
import { AdminController, AdminImageController } from './admin.controller';
import { FirebaseModule } from '../firebase/firebase.module';
import { ImageModule } from '../image/image.module';

@Module({
  imports: [FirebaseModule, ImageModule],
  controllers: [AdminController, AdminImageController],
  providers: [],
  exports: [],
})
export class AdminModule {}
