const tokensDb = require("./tokens.db");

const menuItems = [
  {
    id: 1,
    name: "pasta",
    price: 100,
  },
  {
    id: 2,
    name: "sushi",
    price: 120,
  },
  {
    id: 3,
    name: "cake",
    price: 50,
  },
  {
    id: 4,
    name: "coffee",
    price: 45,
  },
];

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
    res.write(JSON.stringify(menuItems));
    res.end();
    return;
  }

  res.statusCode = 404;
  res.write("not found");
  res.end();
}

module.exports = { serverHandler };
