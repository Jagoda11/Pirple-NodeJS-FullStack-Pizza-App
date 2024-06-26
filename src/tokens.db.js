// key-value map of tokenId:token
// example: {
//    n893jb0ukcqcbt6crb1xi6qinb4w71: { email: "johndoe@gmail.com", ...}
// }
const allTokens = new Map();

// admin token
allTokens.set('dbbcb943-5bff-45a8-86e7-665bdd22eb25', {
  name: 'miniMe',
  email: 'vigiho5448@trejni.com',
  admin: true,
});

function addToken(id, token) {
  allTokens.set(id, token);
}

function tokenExists(id) {
  return allTokens.has(id);
}

function removeToken(id) {
  allTokens.delete(id);
}

function getToken(id) {
  return allTokens.get(id);
}

module.exports = {
  addToken,
  removeToken,
  tokenExists,
  getToken,
};
