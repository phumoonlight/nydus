import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VurlModule } from './apps/vurl/vurl.module';

@Module({
  imports: [VurlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
