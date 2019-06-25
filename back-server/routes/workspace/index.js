const create = require('./create');
const remove = require('./remove');
const read = require('./read');
const readWorkspace = require('./readWorkspace');
const update = require('./update');

function workspace(workspaceService, router) {

  router.post('/workspace/create', create(workspaceService));
  router.post('/workspace/delete', remove(workspaceService));
  router.post('/workspaces/read', read(workspaceService));
  router.post('/workspace/read', readWorkspace(workspaceService));
  router.post('/workspace/update', update(workspaceService));
  return router;
}

module.exports = workspace;