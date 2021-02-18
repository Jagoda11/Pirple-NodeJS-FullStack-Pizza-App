const http = require("https");

const API_KEY =
  "sk_test_51IMGJKCVp1dLjTLZNDNq8btUX0l6GZvfxyJOTuvrDFz0RiZbUg4PrOZ1u3mCdCkNOpxxx7ckdMNUlZe5SPidGYpd00PqtRKawe:";

function charge(amount, cardNumber, callback) {
  const options = {
    host: "api.stripe.com",
    path: "/v1/charges",
    auth: API_KEY,
  };

  const req = http.request(options, (response) => {
    let str = "";
    response.on("data", (chunk) => (str += chunk));
    response.on("end", () => {
      const response = JSON.parse(str);
      const succeeded = response.data[0].status === "succeeded";
      callback(succeeded);
    });
  });

  const payload = {
    amount,
    currency: "sek",
    source: "tok_mastercard", // for testing purposes
    description: "for testing",
  };
  req.write(JSON.stringify(payload));
  req.end();
}

module.exports = { charge };
