/* eslint-disable n/no-missing-import */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable  @typescript-eslint/no-explicit-any */
import fastify from 'fastify';
import './firebaseApp';
import type { FastifyInstance } from 'fastify';
import makePromisesSafe from 'make-promises-safe';
import closeWithGrace from 'close-with-grace';
import helmet from '@fastify/helmet';
import routes from './routes';
import { UNHANDLER_ERROR_MESSAGE } from './utils/constants';

const server: FastifyInstance = fastify({
  logger: true
});

const configServer = () => {
  makePromisesSafe.logError = function (err: any) {
    server.log.error(err, UNHANDLER_ERROR_MESSAGE);
  };

  server.register(routes);
  server.register(helmet);
  const closeListeners = closeWithGrace(
    { delay: Number(process.env['FASTIFY_CLOSE_GRACE_DELAY']) || 500 },
    async ({ signal: _signal, err, manual: _manual }) => {
      if (err) {
        server.log.error(err);
      }
      await server.close();
    }
  );

  server.addHook('onClose', (_instance, done) => {
    closeListeners.uninstall();
    done();
  });
};

configServer();

export default server;
