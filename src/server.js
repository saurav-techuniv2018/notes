const hapi = require('hapi');

const server = new hapi.Server();

const serverPort = process.env.PORT || process.argv[2] || 8080;
server.connection({
  host: '0.0.0.0',
  port: Number(serverPort),
});

server.route({
  path: '/',
  method: 'GET',
  handler: (request, response) => {
    response({
      app: 'notes',
      version: '1.0.0',
    });
  },
});

server.start((error) => {
  if (error) console.log(error);

  console.log(`Server running at: ${server.info.uri}`);
});

