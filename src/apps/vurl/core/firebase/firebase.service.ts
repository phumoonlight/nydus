import { Injectable } from '@nestjs/common';
import { DecodedIdToken } from 'firebase-admin/auth';
import { firebaseAuth, firebaseBucket } from './firebase.app';

@Injectable()
export class FirebaseService {
  uploadImageFile(file: Express.Multer.File, dest: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (!file) return resolve('');
      if (!file.mimetype.startsWith('image/')) resolve('');
      const bucketName = firebaseBucket.name;
      const blob = firebaseBucket.file(dest);
      const blobStream = blob.createWriteStream({ resumable: false });
      blobStream.on('error', (error) => {
        console.error(error);
        reject(error);
      });
      blobStream.on('finish', () => {
        const encodedDest = encodeURIComponent(dest);
        const url = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodedDest}?alt=media`;
        resolve(url);
      });
      blobStream.end(file.buffer);
    });
  }

  async deleteImageFile(path: string) {
    if (!path) return;
    const file = firebaseBucket.file(path);
    await file.delete();
  }

  async verifyIdToken(token: string): Promise<DecodedIdToken> {
    return await verifyIdToken(token);
  }

  async listUsers() {
    return firebaseAuth.listUsers();
  }
}

export const verifyIdToken = async (token: string) => {
  try {
    const decodedIdToken = await firebaseAuth.verifyIdToken(token);
    return decodedIdToken;
  } catch (error) {
    console.log(error);
    return null;
  }
};
