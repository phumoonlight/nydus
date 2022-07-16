import { Controller, Get } from '@nestjs/common';

@Controller('vurl')
export class VurlController {
  @Get()
  getHello() {
    return {
      message: 'Hello World! Vurl',
    };
  }

  @Get('/wow/za')
  getWow() {
    return {
      message: 'Hello World! Vurl Wow Za',
    };
  }
}
