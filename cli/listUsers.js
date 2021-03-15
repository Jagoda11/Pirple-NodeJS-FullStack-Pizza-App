const cli = require('./cli');

module.exports = function () {
  cli.responders.listUsers = function () {
    process.listUsers(1);
  };
};
