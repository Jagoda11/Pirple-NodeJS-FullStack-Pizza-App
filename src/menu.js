const tokensDb = require("./tokens.db");
const menuDb = require("./menu.db");

function validateUserLogin(req, res) {
  const token = req.headers.authorization;
  if (tokensDb.tokenExists(token)) {
    return true;
  } else {
    res.statusCode = 403;
    res.write("forbidden");
    res.end();
    return false;
  }
}

function serverHandler(req, res) {
  //
  if (req.method == "GET" && req.url === "/menu") {
    if (validateUserLogin(req, res) === false) {
      return;
    }

    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(menuDb.getItems()));
    res.end();
    return;
  }

  res.statusCode = 404;
  res.write("not found");
  res.end();
}

module.exports = { serverHandler };
