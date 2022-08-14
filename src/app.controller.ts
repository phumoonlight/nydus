import { Controller, Get } from '@nestjs/common';
import { getVersion } from './app.env';

@Controller()
export class AppController {
  @Get()
  async getInfo() {
    return {
      status: 'ok',
      version: await getVersion(),
    };
  }
}
