import { UserRecord } from 'firebase-admin/auth';
import { User } from '../user/interfaces';
import { BadRequestError } from '../utils/errors/customErrors/badRequestError';
import { FirebaseAuthRepository } from '../utils/firebase/authenticacion/authentication';

export class UserRepository {
  constructor(private firebaseAuth: FirebaseAuthRepository) {}
  async getUserById(id: string): Promise<User> {
    const product = await this.firebaseAuth.getUserById<User>(id);
    if (product !== undefined) return product;
    throw new BadRequestError('Verifique los datos enviados.');
  }
  async getUserByEmail(email: string): Promise<User> {
    const product = await this.firebaseAuth.getUserByEmail<User>(email);
    if (product !== undefined) return product;
    throw new BadRequestError('Verifique los datos enviados.');
  }
  async createUser(user: User): Promise<UserRecord> {
    user.emailVerified = false;
    const res = await this.firebaseAuth.createUser<UserRecord>(user);
    return res;
  }
  async updateUser(userId: string, data: Partial<User>): Promise<User> {
    const res = await this.firebaseAuth.updateUser<User>(userId, data);
    return res;
  }
}