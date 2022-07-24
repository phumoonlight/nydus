import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UploadedImage, UploadedImageDocument } from './image.schema';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class ImageService {
  private IMAGE_FILENAME_PREFIX = 'v';

  constructor(
    private firebaseService: FirebaseService,
    @InjectModel(UploadedImage.name)
    private imageModel: Model<UploadedImageDocument>
  ) {}

  async getList(userId: string): Promise<UploadedImageDocument[]> {
    return await this.imageModel.find({ uid: userId });
  }

  async upload(file: Express.Multer.File, userId: string): Promise<string> {
    const newFilePath = this.generatePath(userId, file);
    const resultUrl = await this.firebaseService.uploadImageFile(
      file,
      newFilePath
    );
    if (resultUrl) {
      await this.imageModel.create({
        uid: userId,
        url: resultUrl,
        path: newFilePath,
      });
    }
    return resultUrl;
  }

  async delete(id: string) {
    const img = await this.imageModel.findById(id);
    if (!img) return;
    const path = img.path;
    const cc = await this.firebaseService.deleteImageFile(path);
    console.log(path, cc);
    const result = img.remove();
    return result;
  }

  generatePath(userId: string, file: Express.Multer.File): string {
    const dirname = userId ? `uploadimgs/owned/${userId}` : `uploadimgs/shared`;
    const randomizedNumber = Math.round(Math.random() * 900000) + 100000;
    const newFilename = `${Date.now()}-${randomizedNumber}`;
    const splitedFileName = file.originalname.split('.');
    const fileExtension = splitedFileName[splitedFileName.length - 1];
    const newFileName = `${this.IMAGE_FILENAME_PREFIX}-${newFilename}.${fileExtension}`;
    const newFilePath = `${dirname}/${newFileName}`;
    return newFilePath;
  }
}
