const isAuthenticated = require('./isAuthenticated');

module.exports = class Auth {
  constructor(api) {
    this.api = api;
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }
  isAuthenticated(params) {
    return isAuthenticated(params, this.api)
  }
};