import { Module } from '@nestjs/common';
import { AdminImageController } from './admin.controller';
import { FirebaseModule } from '../firebase/firebase.module';
import { ImageModule } from '../image/image.module';

@Module({
  imports: [FirebaseModule, ImageModule],
  controllers: [AdminImageController],
  providers: [],
  exports: [],
})
export class AdminModule {}
