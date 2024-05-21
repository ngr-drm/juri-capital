import Fastify from 'fastify';
import { pgPool } from './api/providers/pg-db/pg-connector';
import routes from './api/gateway';

(async function run() {
  const fastify = Fastify({ logger: true });

  try {
    const client = await (await pgPool()).connect();
    client.release(true);
    fastify.log.info('successful database connection...');
  } catch (error) {
    fastify.log.error('database connection failure...');
    process.exit(1);
  }

  await fastify.register(routes);

  fastify.listen({ port: 3000, host: '127.0.0.1' }, function (error, address) {
    if (error) {
      fastify.log.error(error);
      process.exit(1);
    }
    console.log(`server is now listening on ${address}`);
  });
})();
