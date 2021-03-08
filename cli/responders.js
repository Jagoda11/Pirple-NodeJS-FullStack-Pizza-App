const getMenuItems = require('./getMenuItems');

module.exports = function (cli) {
  cli.responders.exit = function () {
    process.exit(0);
  };

  cli.responders.getMenuItems = getMenuItems;
};
