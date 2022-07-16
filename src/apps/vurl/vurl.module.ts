import { Module } from '@nestjs/common';
import { VurlController } from './vurl.controller';

@Module({
  imports: [],
  controllers: [VurlController],
})
export class VurlModule {}
