/* eslint-disable n/no-missing-import */
import type { FastifyRequest, FastifyReply } from 'fastify';
import { User } from '../interfaces';
import { FirebaseAuthRepository } from '../../utils/firebase/authenticacion/authentication';
import { UserRepository } from '../../repositories/userRepository';
import { BadRequestError } from '../../utils/errors/customErrors';

/**
 * @param {FastifyRequest} request Objeto request de Fastify
 * @param {FastifyReply} reply Objeto reply de Fastify
 * @returns {Promise<never>} Promesa con el user
 */
export async function handler(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<never> {
  try {
    const firebaseAuthRepository: FirebaseAuthRepository = new FirebaseAuthRepository();
    const userRepository: UserRepository = new UserRepository(firebaseAuthRepository);
    const resp = await getUserById(request, userRepository);
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
 * @param {UserRepository} userRepository Objeto reply de Fastify
 * @returns {Promise<User>} Promesa con el user
 */
export async function getUserById(
  request: FastifyRequest,
  userRepository: UserRepository
): Promise<User | undefined> {
  const userId = (request.params as {userId: string}).userId;
  if (userId) {
    return await userRepository.getUserById(userId);
  }
  throw new BadRequestError('Error en los datos enviados, por favor verifique.');
}
