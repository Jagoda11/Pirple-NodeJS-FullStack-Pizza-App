const config = require("./config");
const crypto = require("crypto");

function log(msg) {
  console.log(getTimeStamp() + " " + msg);
}

function getTimeStamp() {
  return new Date().toISOString().substr(14, 9);
}

// Create a SHA256 hash
const createHash = function (str) {
  if (typeof str == "string" && str.length > 0) {
    const hash = crypto
      .createHmac("sha256", config.hashingSecret)
      .update(str)
      .digest("hex");
    return hash;
  } else {
    return false;
  }
};

// Create a string of random alphanumeric characters, of a given length
const createRandomString = function (strLength) {
  // Define all the possible characters that could go into a string
  const possibleCharacters = "abcdefghijklmnopqrstuvwxyz0123456789";

  // Start the final string
  let str = "";
  for (i = 1; i <= strLength; i++) {
    // Get a random character from the possibleCharacters string
    const randomCharacter = possibleCharacters.charAt(
      Math.floor(Math.random() * possibleCharacters.length)
    );
    // Append this character to the string
    str += randomCharacter;
  }

  return str;
};

module.exports = { log, createHash, createRandomString };
