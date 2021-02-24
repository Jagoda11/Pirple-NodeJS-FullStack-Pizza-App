const http = require('http');
const utils = require('./src/utils');
const users = require('./src/users');
const menu = require('./src/menu');
const shoppingCart = require('./src/shopping-cart');
const order = require('./src/order');

function serverHandler(req, res) {
  utils.log(`${req.method} ${req.url}`);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.url.startsWith('/users')) {
    utils.log('routing to users handler');
    users.serverHandler(req, res);

    utils.log('Finished users handler');
    return;
  }

  if (req.url.startsWith('/menu')) {
    menu.serverHandler(req, res);
    return;
  }

  if (req.url.startsWith('/shopping-cart')) {
    shoppingCart.serverHandler(req, res);
    return;
  }

  if (req.url.startsWith('/order')) {
    order.serverHandler(req, res);
    return;
  }

  res.statusCode = 404;
  res.write('Not found');
  res.end();
}

http.createServer(serverHandler).listen(3333);
