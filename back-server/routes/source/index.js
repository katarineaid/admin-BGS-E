const create = require('./create');
const remove = require('./remove');
const read = require('./read');
const update = require('./update');

function source(sourceService, router) {

  router.post('/source/create', create(sourceService));
  router.post('/source/delete', remove(sourceService));
  router.post('/source/read', read(sourceService));
  router.post('/source/update', update(sourceService));
  return router;
}

module.exports = source;