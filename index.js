const http = require("http");
const utils = require("./src/utils");
const users = require("./src/users");
const menu = require("./src/menu");

function serverHandler(req, res) {
  utils.log(`${req.method} ${req.url}`);

  if (req.url.startsWith("/users")) {
    utils.log("routing to users handler");
    users.serverHandler(req, res);

    utils.log("Finished users handler");
    return;
  }

  if(req.url.startsWith("/menu")){
    // TODO: check that the user is logged in 
    menu.serverHandler(req, res);
    return;
  }

  res.statusCode = 404;
  res.write("Not found");
  res.end();
}

http.createServer(serverHandler).listen(3000);
