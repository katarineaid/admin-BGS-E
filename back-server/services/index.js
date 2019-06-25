const auth = require('./auth');
const workspace = require('./workspace');
const resources = require('./resources');
const source = require('./source');

module.exports = function (ef) {
  return {
    auth: auth(ef),
    workspace: workspace(ef),
    resources: resources(ef),
    source: source(ef),
  };
};
