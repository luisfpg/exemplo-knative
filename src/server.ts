import { server as HapiServer } from '@hapi/hapi';
import { handler } from './handler';

const init = async () => {

  const server = HapiServer({
    port: 3000
  });

  server.route({
    method: '*',
    path: '/',
    handler: handler
  });

  await server.start();
  console.log('Servidor iniciado em %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
});

init();