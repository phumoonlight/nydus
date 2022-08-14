import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { VurlModule } from './apps/vurl/vurl.module';
import { SnippyModule } from './apps/snippy/snippy.module';

@Module({
  imports: [VurlModule, SnippyModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
