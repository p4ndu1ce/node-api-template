/* eslint-disable n/no-missing-import */
import server from './server';

const PORT = Number(process.env['PORT'] || 3000);
const HOST = '0.0.0.0';

const start = async () => {
  await server.listen({
    host: HOST,
    port: PORT,
  });

  console.log(`Server is up on port ${PORT}`);
};

start();
