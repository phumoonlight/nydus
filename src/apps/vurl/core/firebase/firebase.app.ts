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
