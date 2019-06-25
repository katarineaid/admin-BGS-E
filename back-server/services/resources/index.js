const read = require('./read');
const readPlugins = require('./readPlugins');
const updatePlugins = require('./updatePlugins');

module.exports = function (model, config) {
  return {
    read: read(model, config),
    readPlugins: readPlugins(model, config),
    updatePlugins: updatePlugins(model, config),
  }
};