import { DecodedIdToken, getAuth } from 'firebase-admin/auth';
import { User } from '../../../user/interfaces';

const firebaseAuth = getAuth();

export class FirebaseAuthRepository {
  constructor() {}
  async getUserById<T>(id: string): Promise<T | undefined> {
    try {
      const userRecord = await firebaseAuth.getUser(id);
      return userRecord.toJSON() as T;
    } catch (error) {
      console.error('[getUserById Error]:', error);
      return;
    }
  }

  async getUserByEmail<T>(email: string): Promise<T | undefined> {
    try {
      const userRecord = await firebaseAuth.getUserByEmail(email);
      return userRecord.toJSON() as T;
    } catch (error) {
      console.error('[getUserByEmail Error]:', error);
      return;
    }
  }

  async createUser<T>(user: User): Promise<T> {
    try {
      const userRecord = await firebaseAuth.createUser(user);
      return userRecord.toJSON() as T;
    } catch (error) {
      console.error('[getUserByEmail Error]:', error);
      throw error;
    }
  }

  async updateUser<T>(id: string, userData: Partial<User>): Promise<T> {
    try {
      const userRecord = await firebaseAuth.updateUser(id, userData);
      return userRecord.toJSON() as T;
    } catch (error) {
      console.error('[getUserByEmail Error]:', error);
      throw error;
    }
  }

  async verifyIdToken(idToken: string): Promise<string> {
    try {
      const decodedToken: DecodedIdToken = await firebaseAuth.verifyIdToken(idToken);
      return decodedToken.uid;
    } catch (error) {
      console.error('[verifyIdToken Error]:', error);
      throw error;
    }
  }
}
