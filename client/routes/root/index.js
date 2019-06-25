const getOne = require('./getOne');

function root(router) {

  router.get('/*', getOne());

  return router;
}

module.exports = root;
