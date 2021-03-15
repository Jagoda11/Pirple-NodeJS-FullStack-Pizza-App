const api = require('./api');

module.exports = async function (command) {
  if (command.split(' ').length !== 3) {
    console.error('Invalid arguments');
    return;
  }

  const orderId = command.split(' ').reverse()[0];
  const order = await api.getOrderById(orderId);
  console.log(order || 'Error: order not found');
};
