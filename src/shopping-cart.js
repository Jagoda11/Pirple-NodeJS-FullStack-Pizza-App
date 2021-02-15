const tokensDb = require("./tokens.db");
const menuDb = require("./menu.db");
const shoppingCartDb = require("./shopping-cart.db");

// - The user will make a request POST /shopping-cart/add
//      {
//          itemId: 123,
//      }

// - make sure that the user is logged in
// - get the user email from the token.
// - get the itemid from the body.
// - make sure that the itemId exists.
// - store the order in storage.

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

function readBody(req, callback) {
  let body = [];

  function dataHandler(chunk) {
    // callback - arrow function executed when the data is here
    body.push(chunk);
  }

  function endHandler() {
    body = Buffer.concat(body).toString();
    callback(body);
  }

  // on is executed immediately just to listen to the event
  req.on("data", dataHandler);
  req.on("end", endHandler);
}

function serverHandler(req, res) {
  // Verify that the user is logged in
  if (!validateUserLogin(req, res)) {
    return;
  }

  // Check the method and url
  if (req.method === "POST" && req.url === "/shopping-cart/add") {
    // get the token (that contains the user email) from tokens db
    const token = tokensDb.getToken(req.headers.authorization);
    console.log(token.email);

    // read the body (asynchronously)
    readBody(req, (body) => {
      const itemBody = JSON.parse(body);
      // get the menu item (if exists) from menu db
      const item = menuDb.getItemById(+itemBody.itemId);

      // if the item does NOT exist
      if (!item) {
        res.statusCode = 400;
        res.write("missing item");
        res.end();
        return;
      }

      // if the item does exists
      shoppingCartDb.addItemToCart(token.email, item);
      const userItems = shoppingCartDb.getCart(token.email);
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify(userItems));
      res.end();
    });
    return;
  }

  res.statusCode = 404;
  res.write("not found");
  res.end();
}

module.exports = { serverHandler };
