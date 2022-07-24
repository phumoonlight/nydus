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

  async findAll(): Promise<UploadedImageDocument[]> {
    return await this.imageModel.find();
  }

  async getList(userId: string): Promise<UploadedImageDocument[]> {
    return await this.imageModel.find({ uid: userId });
  }

  async findById(id: string): Promise<UploadedImageDocument> {
    return await this.imageModel.findById(id);
  }

  async upload(file: Express.Multer.File, userId: string): Promise<string> {
    const { filename, path } = this.processFile(userId, file);
    const resultUrl = await this.firebaseService.uploadImageFile(file, path);
    if (resultUrl) {
      await this.imageModel.create({
        uid: userId,
        url: resultUrl,
        fname: filename,
      });
    }
    return resultUrl;
  }

  async delete(imageId: string, userId: string) {
    const img = await this.imageModel.findById(imageId);
    if (!img) return null;
    const filename = img.fname;
    const path = userId
      ? `uploadimgs/owned/${userId}/${filename}`
      : `uploadimgs/shared/${filename}`;
    await this.firebaseService.deleteImageFile(path);
    const result = await img.remove();
    return result;
  }

  processFile(userId: string, file: Express.Multer.File) {
    const dirname = userId ? `uploadimgs/owned/${userId}` : `uploadimgs/shared`;
    const randomizedNumber = Math.round(Math.random() * 900000) + 100000;
    const randomizedFilename = `${Date.now()}-${randomizedNumber}`;
    const splitedFileName = file.originalname.split('.');
    const fileExtension = splitedFileName[splitedFileName.length - 1];
    const newFilename = `${this.IMAGE_FILENAME_PREFIX}-${randomizedFilename}.${fileExtension}`;
    const newFilePath = `${dirname}/${newFilename}`;
    return {
      filename: newFilename,
      path: newFilePath,
    };
  }
}
