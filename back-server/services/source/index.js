const read = require('./read');
const create = require('./create');
const remove = require('./remove');
const update = require('./update');

module.exports = function (model, config) {
  return {
    read: read(model, config),
    create: create(model, config),
    remove: remove(model, config),
    update: update(model, config),
  }
};