const hapi = require('hapi');
const inert = require('inert');
const swagger = require('hapi-swagger');
const vision = require('vision');

const routes = require('./routes');

const server = new hapi.Server();

const serverPort = process.env.PORT || process.argv[2] || 8080;
server.connection({
  host: '0.0.0.0',
  port: Number(serverPort),
});

server.register([
  inert,
  vision,
  swagger,
]);

server.route(routes);

server.start((error) => {
  if (error) console.log(error);

  console.log(`Server running at: ${server.info.uri}`);
});

