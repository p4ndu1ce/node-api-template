import type { FastifyInstance } from 'fastify';
import { CreateProductSchema } from './fastifySchemas/createProduct';
import { handler as getProduct } from './handlers/getProduct';
import { handler as getProducts } from './handlers/getProducts';
import { handler as createProduct } from './handlers/createProduct';
import { handler as updateProduct } from './handlers/updateProduct';
import verifySession from '../middlewares/verifySession';

/**
 *
 * @param server
 * @param _options
 * @param done
 */
export default function productRoutes(
  server: FastifyInstance,
  _options: any,
  done: any
) {
  server.get('/', { preHandler: verifySession }, getProducts);
  server.get('/:productId', { preHandler: verifySession }, getProduct);
  server.post('/', {
    schema: {
      body: {
        ...CreateProductSchema,
      }
    },
    preHandler: verifySession, 
  }, createProduct);
  server.put('/:productId', { preHandler: verifySession }, updateProduct);
  done();
}
