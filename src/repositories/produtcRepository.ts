import { Product } from '../product/interfaces';
import { BadRequestError } from '../utils/errors/customErrors/badRequestError';
import { FirestoreRepository } from '../utils/firebase/firestore/firestoreRepository';

export class ProductRepository {
  constructor(private firestoreRepository: FirestoreRepository) {}
  async getProduct(id: string): Promise<Product> {
    const product = await this.firestoreRepository.getById<Product>(id);
    if (product !== undefined) return product;
    throw new BadRequestError('Verifique los datos enviados.');
  }
  async getProducts(): Promise<Array<Product>> {
    const products = await this.firestoreRepository.getDocs<Product>(['name', 'description', 'price', 'images']);
    return products;
  }
  async addProduct(product: Product): Promise<Product> {
    const res = await this.firestoreRepository.createDoc<Product>(product);
    return res;
  }
  async updateProduct(productId: string, data: Partial<Product>): Promise<Partial<Product>> {
    const res = await this.firestoreRepository.updateDoc(productId, data);
    return res;
  }
}