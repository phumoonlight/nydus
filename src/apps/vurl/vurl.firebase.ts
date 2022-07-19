import { Bucket } from '@google-cloud/storage';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { getAuth } from 'firebase-admin/auth';
import { ENV } from '@/app.env';

const vurlFirebaseApp = initializeApp(
  {
    credential: cert(ENV.vurlFirebaseCertPath),
    storageBucket: ENV.vurlFirebaseStorageBucketName,
  },
  'vurl'
);

const firestore = getFirestore(vurlFirebaseApp);
const bucket = getStorage(vurlFirebaseApp).bucket();
const auth = getAuth(vurlFirebaseApp);

export const vurlFirebase = {
  firestore,
  bucket,
  auth,
};

export const initFirebaseStorageUploader = ({
  folder,
  bucket,
  fileNamePrefix = 'u',
}: {
  folder: string;
  bucket: Bucket;
  fileNamePrefix?: string;
}) => {
  return async (file: Express.Multer.File): Promise<string> => {
    return new Promise<string>((resolve) => {
      if (!file) return resolve('');
      const bucketName = bucket.name;
      const randomizedNumber = Math.round(Math.random() * 900000) + 100000;
      const generated = `${Date.now()}-${randomizedNumber}`;
      const splitedFileName = file.originalname.split('.');
      const fileExtension = splitedFileName[splitedFileName.length - 1];
      const newFileName = `${fileNamePrefix}-${generated}.${fileExtension}`;
      const newFilePath = `${folder}/${newFileName}`;
      const blob = bucket.file(newFilePath);
      const blobStream = blob.createWriteStream({ resumable: false });
      blobStream.on('error', (error) => {
        console.error(error);
        resolve('');
      });
      blobStream.on('finish', () => {
        const url = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${folder}%2F${newFileName}?alt=media`;
        resolve(url);
      });
      blobStream.end(file.buffer);
    });
  };
};

export const uploadImage = initFirebaseStorageUploader({
  bucket: vurlFirebase.bucket,
  folder: 'uploads',
  fileNamePrefix: 'v',
});
