const apiRoutes = require('./api');

const rootRoute = {
  path: '/',
  method: 'GET',
  config: {
    description: 'Basic information about the App',
    tags: ['api'],
  },
  handler: (request, response) => {
    response({
      app: 'notes',
      version: '1.0.0',
    });
  },
};

module.exports = [
  rootRoute,
  ...apiRoutes,
];

