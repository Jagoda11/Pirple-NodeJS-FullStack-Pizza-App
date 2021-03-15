const { v4: uuidv4 } = require('uuid');
const utils = require('./utils');
const usersDb = require('./users.db');
const tokensDb = require('./tokens.db');

/**handle all request that are coming for users api */

function validateUser(user) {
  return (
    typeof user.name === 'string' &&
    typeof user.street_address === 'string' &&
    typeof user.email === 'string' &&
    typeof user.password === 'string'
  );
}

function serverHandler(req, res) {
  // // GET /users : return the list of users
  // if (req.method === "GET" && req.url === "/users") {
  //   res.setHeader("Content-Type", "application/json");
  //   res.write(JSON.stringify(allUsers));
  //   res.end();
  //   return;
  // }

  // ##########################################
  // POST /users : add a user to the list
  if (req.method === 'POST' && req.url === '/users') {
    function bodyHandler(body) {
      const userBody = JSON.parse(body);
      if (validateUser(userBody)) {
        userBody.id = uuidv4();
        userBody.timestamp = new Date();
        userBody.hashedPassword = utils.createHash(userBody.password); // store the hashed version of the password
        delete userBody.password; // remove the original password
        usersDb.addUser(userBody);
        res.write(userBody.id);
        res.end();
      } else {
        res.statusCode = 409;
        res.write(
          'User must contain: name, password, email and street_address'
        );
        res.end();
      }
    }

    readBody(req, bodyHandler);

    utils.log('after readBody');
    return;
  }

  // ##########################################
  // PUT /users/:id : modify a user by id
  // match against (t.ex): /users/c7b6ee79-c89b-4e07-97e2-27cbcecfc072
  const regMatch = req.url.match(/^\/users\/([0-9a-f-]{36})$/i);
  if (req.method === 'PUT' && regMatch) {
    const id = regMatch[1];
    const userIndex = usersDb.getUsers().findIndex((user) => {
      return user.id === id;
    });

    // if the user is not found
    if (userIndex === -1) {
      res.statusCode = 404;
      res.write('user not found');
      res.end();
      return;
    }

    // if the user is found
    readBody(req, (body) => {
      const newUser = JSON.parse(body);
      if (validateUser(newUser)) {
        newUser.id = id;
        newUser.hashedPassword = utils.createHash(newUser.password); // store the hashed version of the password
        delete newUser.password; // remove the original password
        usersDb.updateByIndex(userIndex, newUser);
        res.write(id);
        res.end();
      } else {
        res.statusCode = 409;
        res.write('User must contain: name, email and street_address');
        res.end();
      }
    });
    return;
  }

  // ##########################################
  // DELETE /users/:id : delete a user by id
  if (req.method === 'DELETE' && regMatch) {
    const id = regMatch[1];
    const userIndex = usersDb.getUsers().findIndex((user) => {
      return user.id === id;
    });

    // if the user is not found
    if (userIndex === -1) {
      res.statusCode = 404;
      res.write('user not found');
      res.end();
      return;
    }

    // if the user is found
    usersDb.removeByIndex(userIndex);
    res.end();
    return;
  }

  // ##########################################
  // POST /users/login : login
  if (req.method == 'POST' && req.url === '/users/login') {
    readBody(req, (body) => {
      const loginData = JSON.parse(body);
      const hashedPassword = utils.createHash(loginData.password);
      const loggedInUser = usersDb.loginUser(loginData.email, hashedPassword);
      //if the email or password is wrong
      if (loggedInUser === undefined) {
        res.statusCode = 401;
        res.write('unauthorized');
        res.end();
        return;
      }

      //if email and password is correct
      const tokenId = utils.createRandomString(30);
      const token = { email: loggedInUser.email, creationDate: new Date() };
      tokensDb.addToken(tokenId, token);
      res.write(tokenId);
      res.end();
      return;
    });
    return;
  }

  // ##########################################
  // POST /users/logout : logout

  if (req.method == 'POST' && req.url === '/users/logout') {
    const token = req.headers.authorization;
    tokensDb.removeToken(token);
    res.end();
    return;
  }

  res.statusCode = 404;
  res.write('not found');
  res.end();
}

function readBody(req, callback) {
  utils.log('readBody first line');
  let body = [];

  function dataHandler(chunk) {
    // callback - arrow function executed when the data is here
    utils.log('the callback function of on data');
    body.push(chunk);
  }

  function endHandler() {
    utils.log('the callback function of on end');
    body = Buffer.concat(body).toString();
    callback(body);
  }

  // on is executed immediately just to listen to the event
  req.on('data', dataHandler);
  req.on('end', endHandler);

  utils.log('on data and on end');
}

module.exports = { serverHandler };
