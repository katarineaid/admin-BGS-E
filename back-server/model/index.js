const Auth = require('./Auth');
const DB = require('./DB');
const Library = require('./Library');

class Model {
  constructor(api) {
    this.auth = new Auth(api);
    this.db = new DB(api);
    this.library = new Library();
  }
}

module.exports = Model;