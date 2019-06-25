const read = require('./read');
const readPlugins = require('./readPlugins');
const updatePlugins = require('./updatePlugins');

function resources(resourcesService, router) {

  router.post('/resources/read', read(resourcesService));
  router.post('/resources/read/plugins', readPlugins(resourcesService));
  router.post('/resources/update/plugins', updatePlugins(resourcesService));

  return router;
}

module.exports = resources;
