import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { FirebaseModule } from '../firebase/firebase.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadedImageModelDefinition } from './image.schema';

@Module({
  imports: [
    FirebaseModule,
    MongooseModule.forFeature([UploadedImageModelDefinition]),
  ],
  controllers: [ImageController],
  providers: [ImageService],
  exports: [ImageService],
})
export class ImageModule {}
