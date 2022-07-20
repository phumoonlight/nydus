import { Injectable } from '@nestjs/common';
import { initializeApp, cert, AppOptions } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { getAuth } from 'firebase-admin/auth';
import { ENV } from '@/app.env';

const APP_NAME = 'vurl';

const appOptions: AppOptions = {
  credential: cert(ENV.vurlFirebaseCertPath),
  storageBucket: ENV.vurlFirebaseStorageBucketName,
};

export const firebaseApp = initializeApp(appOptions, APP_NAME);
export const firebaseFirestore = getFirestore(firebaseApp);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);
export const firebaseBucket = firebaseStorage.bucket();

@Injectable()
export class FirebaseService {
  private IMAGE_FILENAME_PREFIX = 'v';
  private DEFAULT_DIRNAME = 'uploadedimages';

  uploadImageFile(
    file: Express.Multer.File,
    dirname = this.DEFAULT_DIRNAME
  ): Promise<string> {
    return new Promise<string>((resolve) => {
      if (!file) return resolve('');
      if (!file.mimetype.startsWith('image/')) resolve('');
      const bucketName = firebaseBucket.name;
      const randomizedNumber = Math.round(Math.random() * 900000) + 100000;
      const newFilename = `${Date.now()}-${randomizedNumber}`;
      const splitedFileName = file.originalname.split('.');
      const fileExtension = splitedFileName[splitedFileName.length - 1];
      const newFileName = `${this.IMAGE_FILENAME_PREFIX}-${newFilename}.${fileExtension}`;
      const newFilePath = `${dirname}/${newFileName}`;
      const blob = firebaseBucket.file(newFilePath);
      const blobStream = blob.createWriteStream({ resumable: false });
      blobStream.on('error', (error) => {
        console.error(error);
        resolve('');
      });
      blobStream.on('finish', () => {
        const url = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${dirname}%2F${newFileName}?alt=media`;
        resolve(url);
      });
      blobStream.end(file.buffer);
    });
  }
}
