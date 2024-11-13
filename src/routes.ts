/* eslint-disable n/no-missing-import */
import type { FastifyInstance } from 'fastify';
import productRoutes from './product/routes';
import userRoutes from './user/routes';
declare module 'fastify' {
  interface FastifyRequest {
    user_id: string;
  }
}

/**
 * @description Creates the routes for the server
 * @param {FastifyInstance} server Instancia de Fastify
 * @returns {FastifyInstance} Instancia de Fastify con las rutas registradas
 */
export default function Routes(server: FastifyInstance): FastifyInstance {
  server.decorateRequest('user_id', '');
  // User routes
  server.register(userRoutes, { prefix: '/user' })
  // product routes
  server.register(productRoutes, { prefix: '/product' });

  return server;
}
