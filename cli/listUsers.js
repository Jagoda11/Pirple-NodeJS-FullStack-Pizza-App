const api = require('./api');

module.exports = async function (command) {
  const users = await api.listUsers();
  console.log(users);
};
