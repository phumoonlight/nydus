import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VurlController } from './apps/vurl/vurl.controller';

@Module({
  imports: [],
  controllers: [AppController, VurlController],
  providers: [AppService],
})
export class AppModule {}
