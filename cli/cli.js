const readline = require('readline');
const util = require('util');
const debug = util.debuglog('cli');
const events = require('events');
class _events extends events {}
const e = new _events();

e.on('exit', function (str) {
  cli.responders.exit();
});

e.on('list menu', function (str) {
  cli.responders.getMenuItems();
});

e.on('list orders', function (str) {
  cli.responders.listOrders();
});

e.on('get order', function (str) {
  cli.responders.getOrderById(str);
});

e.on('get user', function (str) {
  cli.responders.getUserByEmail(str);
});

e.on('list users', function (str) {
  cli.responders.listUsers(str);
});

e.on('help', function (str) {
  cli.responders.help();
});
// Instantiate the cli module object
const cli = { responders: {} };

// Input processor
cli.processInput = function (str) {
  str = typeof str == 'string' && str.trim().length > 0 ? str.trim() : false;
  // Only process the input if the user actually wrote something, otherwise ignore it
  if (str) {
    // Codify the unique strings that identify the different unique questions allowed be the asked
    const uniqueInputs = [
      'man',
      'help',
      'exit',
      'stats',
      'list menu',
      'list users',
      'list orders',
      'get order',
      'get user',
      'more user info',
      'list checks',
      'more check info',
      'list logs',
      'more log info',
    ];

    // Go through the possible inputs, emit event when a match is found
    let matchFound = false;
    let counter = 0;
    uniqueInputs.some(function (input) {
      if (str.toLowerCase().indexOf(input) > -1) {
        matchFound = true;
        // Emit event matching the unique input, and include the full string given
        e.emit(input, str);
        return true;
      }
    });

    // If no match is found, tell the user to try again
    if (!matchFound) {
      console.log('Sorry, try again');
    }
  }
};

// Init script
cli.init = function () {
  // Send to console, in dark blue
  console.log('\x1b[34m%s\x1b[0m', 'The CLI is running');

  // Start the interface
  const _interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '>> ',
  });

  // Create an initial prompt
  _interface.prompt();

  // Handle each line of input separately
  _interface.on('line', function (str) {
    // Send to the input processor
    cli.processInput(str);

    // Re-initialize the prompt afterwards
    _interface.prompt();
  });

  // If the user stops the CLI, kill the associated process
  _interface.on('close', function () {
    process.exit(0);
  });
};

module.exports = cli;
