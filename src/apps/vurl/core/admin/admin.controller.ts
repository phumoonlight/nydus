import { Controller, Delete, Param } from '@nestjs/common';
import { ImageService } from '../image/image.service';

@Controller('images')
export class AdminImageController {
  constructor(private imageService: ImageService) {}

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const result = await this.imageService.delete(id);
    return {
      message: 'success',
      result,
    };
  }
}
