import { FastifyRequest, FastifyReply } from 'fastify';
import { BodyToRegisterProcess, Court, ParamsToFilterProcesses } from './domain/value-objects';
import { fetchByProcessNumber } from './domain/fetch-by-process-number.service';
import { findProcesses } from './domain/fetch-all-process.service';

async function routes(fastify: any) {
  fastify.get('/health', async (request: FastifyRequest, reply: FastifyReply) => {
    reply.code(200).send({ api: 'running...' });
  });

  fastify.post('/process/:court', async (request: FastifyRequest, reply: FastifyReply) => {
    const params = request.params as Court;
    const body = request.body as BodyToRegisterProcess;

    try {
      const process = await fetchByProcessNumber(params.court, body.processo);

      if (!process) {
        reply.log.warn({ message: 'process not found...', process: body.processo });
        return reply.code(404).send({ message: 'process not found...' });
      }

      reply.log.info({ message: 'successful search...', process: body.processo });
      return reply.code(200).send(process);
    } catch (error) {
      reply.log.error(error);
      return reply.code(500).send({ message: 'internal server error...' });
    }
  });

  fastify.get('/processes', async (request: FastifyRequest, reply: FastifyReply) => {
    const queryParams = request.query as Partial<ParamsToFilterProcesses>;
    try {
      const processes = await findProcesses(queryParams);

      if (processes.length === 0) {
        return reply.code(404).send({ message: 'no process was found with the query parameters...' });
      }

      reply.log.info({ message: 'successful search...' });
      reply.code(200).send(processes);
    } catch (error) {
      reply.log.error(error);
      return reply.code(500).send({ message: 'internal server error...' });
    }
  });
}

export default routes;
