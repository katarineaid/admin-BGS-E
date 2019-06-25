const auth = require('./auth');
const workspace = require('./workspace');
const resources = require('./resources');
const source = require('./source');

module.exports = function upGradedRouter(services, router) {
  auth(services.auth, router);
  workspace(services.workspace, router);
  resources(services.resources, router);
  source(services.source, router);
};
