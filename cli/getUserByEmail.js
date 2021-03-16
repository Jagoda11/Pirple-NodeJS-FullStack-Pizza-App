const api = require('./api');

module.exports = async function (command) {
  const userEmail = command.split(' ').reverse()[0];
  const user = await api.getUserByEmail(userEmail);
  console.log(user || 'Error: user not found');
};
