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

module.exports = { log, createHash };
