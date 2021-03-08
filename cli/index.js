// Dependencies
const server = require('../server');
const responders = require('./responders');
const cli = require('./cli');

responders(cli);

// Declare the app
const app = {};

// Init function
app.init = function () {
  // Start the server
  server.init();

  // Start the CLI, but make sure it starts last
  setTimeout(function () {
    cli.init();
  }, 50);
};

// Self executing
app.init();

// Export the app
module.exports = app;
