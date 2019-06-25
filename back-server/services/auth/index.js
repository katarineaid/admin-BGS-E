const isAuthenticated = require('./isAuthenticated');
const signIn = require('./signIn');
const signOut = require('./signOut');

module.exports = function(model, config) {
  return {
    isAuthenticated: isAuthenticated(model, config),
    signIn: signIn(model, config),
    signOut: signOut(model, config),
  }
};