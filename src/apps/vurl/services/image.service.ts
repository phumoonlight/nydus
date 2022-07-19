import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UploadedImage, UploadedImageDocument } from '../schemas/image.schema';
import { initFirebaseStorageUploader, vurlFirebase } from '../vurl.firebase';

@Injectable()
export class ImageService {
  constructor(
    @InjectModel(UploadedImage.name)
    private imageModel: Model<UploadedImageDocument>
  ) {}

  async upload(userId: string, file: Express.Multer.File): Promise<string> {
    const folder = userId
      ? `useruploadedimages/${userId}`
      : 'nonowneruploadedimages';
    const uploadImageFile = initFirebaseStorageUploader({
      bucket: vurlFirebase.bucket,
      folder: folder,
      fileNamePrefix: 'v',
    });
    const uploadedUrl = await uploadImageFile(file);
    if (uploadedUrl) {
      await this.imageModel.create({
        uid: userId,
        url: uploadedUrl,
      });
    }
    return uploadedUrl;
  }
}
