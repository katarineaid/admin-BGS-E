const readDir = require('./readDir');
const readFile = require('./readFile');
const writeFile = require('./writeFile');
const deleteFile = require('./deleteFile');


const fs = require('fs');

module.exports = class Auth {
  constructor(api) {
    this.api = api;
    this.readDir = this.readDir.bind(this);
    this.readFile = this.readFile.bind(this);
    this.writeFile = this.writeFile.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
  }

  readDir(params) {
    return readDir(params, fs, this.api)
  }

  readFile(params) {
    return readFile(params, fs, this.api)
  }

  writeFile(params) {
    return writeFile(params, fs, this.api)
  }

  deleteFile(params) {
    return deleteFile(params, fs, this.api)
  }
};