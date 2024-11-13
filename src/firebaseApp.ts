import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app';
import serviceAccount from '../firebaseServiceAccount.json';

export const app = initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});