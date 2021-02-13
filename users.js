const utils = require("./utils");
const { v4: uuidv4 } = require("uuid");

/**handle all request that are coming for users api */
const allUsers = [
  {
    name: "Dude",
    hashedPassword:
      "9946dad4e00e913fc8be8e5d3f7e110a4a9e832f83fb09c345285d78638d8a0e",
    email: "dude345@hotmail.com",
    street_address: "Stockholm",
    id: "c7b6ee79-c89b-4e07-97e2-27cbcecfc072",
  },
];

function validateUser(user) {
  return (
    typeof user.name === "string" &&
    typeof user.street_address === "string" &&
    typeof user.email === "string" &&
    typeof user.password === "string"
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

  // POST /users : add a user to the list
  if (req.method === "POST" && req.url === "/users") {
    function bodyHandler(body) {
      const userBody = JSON.parse(body);
      if (validateUser(userBody)) {
        userBody.id = uuidv4();
        userBody.hashedPassword = utils.createHash(userBody.password); // store the hashed version of the password
        delete userBody.password; // remove the original password
        allUsers.push(userBody);
        res.write(userBody.id);
        res.end();
      } else {
        res.statusCode = 409;
        res.write("User must contain: name, email and street_address");
        res.end();
      }
    }

    readBody(req, res, bodyHandler);

    utils.log("after readBody");
    return;
  }

  // PUT /users/:id : modify a user by id
  // match against (t.ex): /users/c7b6ee79-c89b-4e07-97e2-27cbcecfc072
  const regMatch = req.url.match(/^\/users\/([0-9a-f-]{36})$/i);
  if (req.method === "PUT" && regMatch) {
    const id = regMatch[1];
    const userIndex = allUsers.findIndex((user) => {
      return user.id === id;
    });

    // if the user is not found
    if (userIndex === -1) {
      res.statusCode = 404;
      res.write("user not found");
      res.end();
      return;
    }

    // if the user is found
    readBody(req, res, (body) => {
      const newUser = JSON.parse(body);
      if (validateUser(newUser)) {
        newUser.id = id;
        newUser.hashedPassword = utils.createHash(newUser.password); // store the hashed version of the password
        delete newUser.password; // remove the original password

        allUsers[userIndex] = newUser;
        res.write(id);
        res.end();
      } else {
        res.statusCode = 409;
        res.write("User must contain: name, email and street_address");
        res.end();
      }
    });
    return;
  }

  // DELETE /users/:id : delete a user by id
  if (req.method === "DELETE" && regMatch) {
    const id = regMatch[1];
    const userIndex = allUsers.findIndex((user) => {
      return user.id === id;
    });

    // if the user is not found
    if (userIndex === -1) {
      res.statusCode = 404;
      res.write("user not found");
      res.end();
      return;
    }

    // if the user is found
    allUsers.splice(userIndex, 1);
    res.end();
    return;
  }

  res.statusCode = 404;
  res.write("not found");
  res.end();
}

function readBody(req, res, callback) {
  utils.log("readBody first line");
  let body = [];

  function dataHandler(chunk) {
    // callback - arrow function executed when the data is here
    utils.log("the callback function of on data");
    body.push(chunk);
  }

  function endHandler() {
    utils.log("the callback function of on end");
    body = Buffer.concat(body).toString();
    callback(body);
  }

  // on is executed immediately just to listen to the event
  req.on("data", dataHandler);
  req.on("end", endHandler);

  utils.log("on data and on end");
}

module.exports = { serverHandler };
