// 1. user will POST /order/checkout ✅
// 2. verify that the user is logged in ✅
// 3. verify that the user has something in the shopping cart ✅
// 4. charge the amount of the shopping cart with stripe ✅
// 5. clear the shopping cart ✅
// 6. create an orders.db which will store the order of the user ✅
// 7. send a mail to the user

const tokensDb = require("./tokens.db");
const shoppingCartDb = require("./shopping-cart.db");
const stripe = require("./stripe");
const ordersDb = require("./orders.db");

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
  if (req.method === "POST" && req.url === "/order/checkout") {
    // get the token (that contains the user email) from tokens db
    const token = tokensDb.getToken(req.headers.authorization);
    const cart = shoppingCartDb.getCart(token.email);
    console.log(token.email);
    console.log(cart);
    //if the user does not have a cart
    if (!cart) {
      res.statusCode = 400;
      res.write("no cart");
      res.end();
      return;
    }

    //if the user has a cart
    readBody(req, (body) => {
      const cardDetails = JSON.parse(body);
      const amount = cart
        .map((item) => item.totalPrice)
        .reduce((a, b) => a + b, 0);
      stripe.charge(amount, cardDetails.number, (paymentSucceeded) => {
        console.log("paymentSucceeded: " + paymentSucceeded);

        if (!paymentSucceeded) {
          res.statusCode = 400;
          res.write("payment failed");
          res.end();
          return;
        }

        ordersDb.createOrder({ email: token.email, cart });

        shoppingCartDb.clearShoppingCart(token.email);
        res.write("order placed :)");
        res.end();
      }); //TODO
    });

    return;
  }

  res.statusCode = 404;
  res.write("not found");
  res.end();
}

module.exports = { serverHandler };
