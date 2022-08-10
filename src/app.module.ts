import { Module } from '@nestjs/common';
import { VurlModule } from './apps/vurl/vurl.module';
import { SnippyModule } from './apps/snippy/snippy.module';

@Module({
  imports: [VurlModule, SnippyModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
