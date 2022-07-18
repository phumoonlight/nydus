import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ENV } from '@/app.env';
import { VurlController } from './vurl.controller';
import { vurlConfig } from './vurl.config';
import { VurlService } from './vurl.service';
import { ImageService } from './services/image.service';
import { LinkModelDefinition } from './schemas/link.schema';
import { LinkGroupModelDefinition } from './schemas/linkgroup.schema';
import { UploadedImageModelDefinition } from './schemas/image.schema';

@Module({
  imports: [
    MongooseModule.forRoot(ENV.vurlMongoConn, vurlConfig.mongooseOptions),
    MongooseModule.forFeature([
      LinkModelDefinition,
      LinkGroupModelDefinition,
      UploadedImageModelDefinition,
    ]),
  ],
  controllers: [VurlController],
  providers: [VurlService, ImageService],
})
export class VurlModule {}
