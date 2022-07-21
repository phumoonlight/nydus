import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FirebaseService } from './firebase.service';
import { UploadedImage, UploadedImageDocument } from '../schemas/image.schema';

@Injectable()
export class ImageService {
  constructor(
    private firebaseService: FirebaseService,
    @InjectModel(UploadedImage.name)
    private imageModel: Model<UploadedImageDocument>
  ) {}

  async upload(file: Express.Multer.File, userId: string): Promise<string> {
    const dirname = userId ? `uploadimgs/owned/${userId}` : `uploadimgs/shared`;
    const resultUrl = await this.firebaseService.uploadImageFile(file, dirname);
    if (resultUrl) {
      await this.imageModel.create({
        uid: userId,
        url: resultUrl,
      });
    }
    return resultUrl;
  }
}
