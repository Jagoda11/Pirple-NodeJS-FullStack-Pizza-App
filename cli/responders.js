const getMenuItems = require('./getMenuItems');
const help = require('./help');
const listUsers = require('./listUsers');
const listOrders = require('./listOrders');
const getOrderById = require('./getOrderById');
const getUserByEmail = require('./getUserByEmail');

module.exports = function (cli) {
  cli.responders.exit = function () {
    process.exit(0);
  };

  cli.responders.getMenuItems = getMenuItems;
  cli.responders.help = help;
  cli.responders.listOrders = listOrders;
  cli.responders.getOrderById = getOrderById;
  cli.responders.listUsers = listUsers;
  cli.responders.getUserByEmail = getUserByEmail;
};
