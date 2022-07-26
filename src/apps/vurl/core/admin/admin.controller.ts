import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { HTTP_UNAUTHORIZED } from '@/common/error';
import { ImageService } from '../image/image.service';
import { AdminGuard } from './admin.guard';
import { ENV } from '@/app.env';
import { generateToken } from '@/common/jwt';

@Controller()
export class AdminController {
  @Post('login')
  async deleteImage(@Body('key') key: string) {
    if (key !== ENV.vurlAdminAuthKey) throw HTTP_UNAUTHORIZED;
    const token = generateToken({ key });
    return {
      token,
    };
  }
}

@Controller('images')
@UseGuards(AdminGuard)
export class AdminImageController {
  constructor(private imageService: ImageService) {}

  @Get()
  async getList() {
    const imgList = await this.imageService.findAll();
    return {
      value: imgList,
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const img = await this.imageService.findById(id);
    if (!img) {
      return {
        message: 'img_not_found',
      };
    }
    const result = await this.imageService.delete(id, img.uid);
    return {
      message: 'success',
      result,
    };
  }
}
