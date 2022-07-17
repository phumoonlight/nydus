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
