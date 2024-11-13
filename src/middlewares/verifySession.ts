import { FastifyReply, FastifyRequest } from 'fastify';
import { FirebaseAuthRepository } from '../utils/firebase/authenticacion/authentication';

/**
 * @param {FastifyRequest} request Objeto request de Fastify
 * @param {FastifyReply} reply Objeto reply de Fastify
 */
export default async function verifySession(request: FastifyRequest, reply: FastifyReply) {
  if (request.headers.authorization) {
    try {
      const firebaseAuth = new FirebaseAuthRepository();
      const userId = await firebaseAuth.verifyIdToken(request.headers.authorization);
      request.user_id = userId;
      return;
    } catch (error) {
      reply.code(401);
      return new Error('Unauthorized');
    }
  }
  reply.code(401);
  return new Error('Unauthorized');
}