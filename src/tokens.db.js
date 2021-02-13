const allTokens = new Map();

function addToken(id, token) {
  allTokens.set(id, token);
}

function tokenExists(id) {
  return allTokens.has(id);
}

function removeToken(id) {
  allTokens.delete(id);
}

module.exports = {
  addToken: addToken,
  removeToken: removeToken,
  tokenExists: tokenExists,
};
