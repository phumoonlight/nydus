import { Module } from '@nestjs/common';
import { VurlModule } from './apps/vurl/vurl.module';

@Module({
  imports: [VurlModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
