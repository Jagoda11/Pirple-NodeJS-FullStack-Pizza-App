const tokensDb = require('./tokens.db');
const shoppingCartDb = require('./shopping-cart.db');
const stripe = require('./stripe');
const ordersDb = require('./orders.db');
const mail = require('./mail');

const isRecentOrder = (order) =>
  new Date() - order.timestamp < 1000 * 60 * 60 * 24;

function validateUserLogin(req, res) {
  const token = req.headers.authorization;
  if (tokensDb.tokenExists(token)) {
    return true;
  } else {
    res.statusCode = 403;
    res.write('forbidden');
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
  req.on('data', dataHandler);
  req.on('end', endHandler);
}

function serverHandler(req, res) {
  // Verify that the user is logged in
  if (!validateUserLogin(req, res)) {
    return;
  }

  if (req.method === 'GET' && req.url === '/orders') {
    const token = tokensDb.getToken(req.headers.authorization);
    if (token.admin !== true) {
      res.statusCode = 401;
      res.write('forbidden');
      res.end();
      return;
    }
    const orders = ordersDb.getOrders();
    const recentOrders = orders.filter(isRecentOrder);
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(recentOrders));
    res.end();
    return;
  }

  const regMatch = req.url.match(/^\/order\/([0-9]+)$/i);
  if (req.method === 'GET' && regMatch) {
    const token = tokensDb.getToken(req.headers.authorization);
    if (token.admin !== true) {
      res.statusCode = 401;
      res.write('forbidden');
      res.end();
      return;
    }

    const orderId = regMatch[1];
    const order = ordersDb.getOrderById(+orderId);
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(order || null));
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/order/checkout') {
    // get the token (that contains the user email) from tokens db
    const token = tokensDb.getToken(req.headers.authorization);
    const cart = shoppingCartDb.getCart(token.email);
    console.log(token.email);
    console.log(cart);
    //if the user does not have a cart
    if (!cart) {
      res.statusCode = 400;
      res.write('no cart');
      res.end();
      return;
    }

    //if the user has a cart
    readBody(req, (body) => {
      const cardDetails = JSON.parse(body);
      const amount = cart
        .map((item) => item.totalPrice)
        .reduce((a, b) => a + b, 0);
      stripe.charge(amount, cardDetails.cardNumber, (paymentSucceeded) => {
        console.log('paymentSucceeded: ' + paymentSucceeded);

        if (!paymentSucceeded) {
          res.statusCode = 400;
          res.write('payment failed');
          res.end();
          return;
        }

        ordersDb.createOrder({
          email: token.email,
          cart,
          timestamp: new Date(),
        });
        // send mail with receipt
        mail.send(
          token.email,
          'Order Receipt',
          'Your order has bean placed, you have been charged with the amount ' +
            amount
        );
        shoppingCartDb.clearShoppingCart(token.email);
        res.write('order placed :)');
        res.end();
      });
    });

    return;
  }

  res.statusCode = 404;
  res.write('not found');
  res.end();
}

module.exports = { serverHandler };
