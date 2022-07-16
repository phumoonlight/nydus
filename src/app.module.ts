import { Module } from '@nestjs/common';
import { VurlModule } from '@/apps/vurl/vurl.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [VurlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
