const api = require('./api');

module.exports = async function (command) {
  const items = await api.getMenu();
  console.log(items);
};
