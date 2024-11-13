import type { FastifyInstance } from 'fastify';
import { CreateUserSchema } from './fastifySchemas/createUser';
import { handler as getUser } from './handlers/getUser';
import { handler as createUser } from './handlers/createUser';
import { handler as updateUser } from './handlers/updateUser';
import verifySession from '../middlewares/verifySession';

/**
 *
 * @param server
 * @param _options
 * @param done
 */
export default function userRoutes(
  server: FastifyInstance,
  _options: any,
  done: any
) {
  server.get('/:userId', { preHandler: verifySession }, getUser);
  server.post('/', {
    schema: {
      body: {
        ...CreateUserSchema,
      }
    }
  }, createUser);
  server.put('/:userId', { preHandler: verifySession }, updateUser);
  done();
}
