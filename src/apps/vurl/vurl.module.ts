import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ENV } from '@/app.env';
import { VurlController } from './vurl.controller';
import { Link, LinkGroup, LinkGroupSchema, LinkSchema } from './vurl.schema';
import { vurlConfig } from './vurl.config';
import { VurlService } from './vurl.service';

@Module({
  imports: [
    MongooseModule.forRoot(ENV.vurlMongoConn, vurlConfig.mongooseOptions),
    MongooseModule.forFeature([
      { name: Link.name, schema: LinkSchema },
      { name: LinkGroup.name, schema: LinkGroupSchema },
    ]),
  ],
  controllers: [VurlController],
  providers: [VurlService],
})
export class VurlModule {}
