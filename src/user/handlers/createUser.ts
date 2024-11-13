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
    const resp = await createUser(request, userRepository);
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
 * @returns {Promise<{id: string}>} Promesa con el user
 */
export async function createUser(
  request: FastifyRequest,
  userRepository: UserRepository
): Promise<{id: string}> {
  const user = request.body as User;
  if (user) {
    const userSaved = await userRepository.createUser(user);
    return {
      id: userSaved.uid
    };
  }
  throw new BadRequestError('Error en los datos enviados, por favor verifique.');
}
