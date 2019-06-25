const pSQL = require('./pSQL');

module.exports = function (config) {
  return {
    pSQL: pSQL(config),
  };
};

