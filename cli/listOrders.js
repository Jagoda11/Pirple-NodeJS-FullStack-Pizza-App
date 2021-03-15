const api = require('./api');

module.exports = async function (command) {
  const items = await api.listOrders();
  console.log(items);
};
