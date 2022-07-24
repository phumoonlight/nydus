import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { Authorization } from '@/apps/vurl/vurl.auth';

const ErrUploadImageFailed = new HttpException(
  'upload_image_failed',
  HttpStatus.INTERNAL_SERVER_ERROR
);

@Controller()
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Get()
  async getList(@Authorization() userId: string) {
    const list = await this.imageService.getList(userId);
    return {
      value: list,
    };
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Authorization() userId: string
  ) {
    const resultUrl = await this.imageService.upload(file, userId);
    if (!resultUrl) throw ErrUploadImageFailed;
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
    if (!resultUrl) throw ErrUploadImageFailed;
    return {
      value: resultUrl,
    };
  }

  @Delete(':id')
  async delete(@Authorization() _: string, @Param('id') id: string) {
    const result = await this.imageService.delete(id);
    return {
      message: 'success',
      result,
    };
  }
}
