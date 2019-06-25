const create = require('./create');
const remove = require('./remove');
const read = require('./read');
const readWorkspace = require('./readWorkspace');
const update = require('./update');

module.exports = function (model, config) {
  return {
    create: create(model, config),
    remove: remove(model, config),
    read: read(model, config),
    readWorkspace: readWorkspace(model, config),
    update: update(model, config),
  }
};