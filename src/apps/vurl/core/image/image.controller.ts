import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { Auth } from '@/apps/vurl/vurl.auth';

@Controller()
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Get()
  async getList(@Auth() userId: string) {
    const list = await this.imageService.getList(userId);
    return {
      value: list,
    };
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Auth() userId: string
  ) {
    const resultUrl = await this.imageService.upload(file, userId);
    return {
      value: resultUrl,
    };
  }

  @Get('shared')
  async getSharedList() {
    const list = await this.imageService.getList('');
    return {
      value: list,
    };
  }

  @Post('shared')
  @UseInterceptors(FileInterceptor('file'))
  async uploadShared(@UploadedFile() file: Express.Multer.File) {
    const resultUrl = await this.imageService.upload(file, '');
    return {
      value: resultUrl,
    };
  }

  @Delete(':id')
  async delete(@Auth() userId: string, @Param('id') imageId: string) {
    const result = await this.imageService.delete(imageId, userId);
    return result;
  }
}
