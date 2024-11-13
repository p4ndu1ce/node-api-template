/* eslint-disable n/no-missing-import */
import type { FastifyRequest, FastifyReply } from 'fastify';
import { FirestoreRepository } from '../../utils/firebase/firestore/firestoreRepository';
import { PRODUCT_COLLECTION } from '../../utils/constants';
import { ProductRepository } from '../../repositories/produtcRepository';
import { Product } from '../interfaces';
import { BadRequestError } from '../../utils/errors/customErrors';

/**
 * @param {FastifyRequest} request Objeto request de Fastify
 * @param {FastifyReply} reply Objeto reply de Fastify
 * @returns {Promise<never>} Promesa con el producto
 */
export async function handler(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<never> {
  try {
    const firestoreRepository: FirestoreRepository = new FirestoreRepository(PRODUCT_COLLECTION);
    const productRepository: ProductRepository = new ProductRepository(firestoreRepository);
    const resp = await getProduct(request, productRepository);
    return reply
      .code(200)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(resp);
  } catch (error) {
    return reply
      .code(500)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ message: 'ERROR' });
  }
}

/**
 * @param {FastifyRequest} request Objeto request de Fastify
 * @param {ProductRepository} productRepository Objeto reply de Fastify
 * @returns {Promise<Product>} Promesa con el producto
 */
export async function getProduct(
  request: FastifyRequest,
  productRepository: ProductRepository
): Promise<Product> {
  const productId = (request.params as {productId: string}).productId;
  if (productId) {
    return await productRepository.getProduct(productId);
  }
  throw new BadRequestError('No hay product definido');
}
