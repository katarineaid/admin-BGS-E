const uuid = require('uuid/v4');

module.exports = class Library {
  constructor() {
    this.uuid = uuid;
  }
};