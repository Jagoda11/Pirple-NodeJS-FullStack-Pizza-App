const mailgun = require("mailgun-js");
const config = require("./config");

function send(to, subject, text) {
  const mg = mailgun({
    apiKey: config.mail.apiKey,
    domain: config.mail.domain,
  });
  const data = {
    from: config.mail.from,
    to,
    subject,
    text,
  };
  mg.messages().send(data, function (error, body) {
    console.log(body);
  });
}

module.exports = { send };
