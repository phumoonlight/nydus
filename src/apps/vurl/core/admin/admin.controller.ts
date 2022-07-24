import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ImageService } from '../image/image.service';
import { AdminAuthorization } from '@/apps/vurl/vurl.auth';

@Controller('images')
export class AdminImageController {
  constructor(private imageService: ImageService) {}

  @Get()
  @AdminAuthorization()
  async getList() {
    const imgList = await this.imageService.findAll();
    return {
      value: imgList,
    };
  }

  @Delete(':id')
  @AdminAuthorization()
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
